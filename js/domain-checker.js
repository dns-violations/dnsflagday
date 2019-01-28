'use strict';
var domainChecker = function(domainCheckerInit) {
( function (domainCheckerInit) {
	const API_URL = new URL( '/ednscomp', 'https://ednscomp.isc.org' ); // URL object not supported in MS IE
	const API_METHOD = 'GET';
	const INPUT_NAME = 'zone';
	const PARAM_JSON_NAME = 'json';
	const PARAM_JSON_VALUE = 'yes';
	const INPUT_NODE_NAME = 'INPUT';
	const ROOT_NODE_NAME = 'FORM';
	const SUBMIT_TYPE = 'submit';
	const UNDEFINED = 'undefined';
	const RESULTS_ID = 'domain-checker-results';
	const SUBMIT_ENABLE_AFTER = 30000; // [int] in ms
	const DIVIDERS_REGEXP = new RegExp( '(?:,|;|\\s| |\\r?\\n)+', 'u' ); // lot of possible dividers

	const dict_to_values = function (dict) {
		var values = []
		for (var key in dict) {
			values.push(dict[key])
		}
		return values
	}

	// eval one server
	const eval_edns_strict = function (tests_results) {
		// strip test names -> array of arrays with test results
		var test_values = dict_to_values(tests_results)
		var all_ok = test_values.every(results => results.indexOf('ok') !== -1)
		if (all_ok)
			return 'ok'

		// ignore EDNS1, it will not cause problems during the flag day
		var edns0_tests_results = {}
		for (var key in tests_results) {
			if (key.indexOf('edns1') === -1)
				edns0_tests_results[key] = tests_results[key]
			else
				edns0_tests_results[key] = ['ignored']
		}
		test_values = dict_to_values(edns0_tests_results)

		// does not fully comply with EDNS but at least it does not break horribly
		var compatible = test_values.every(results => results.indexOf('timeout') === -1)
		if (compatible)
			return 'compatible'
		else // timeout detected, it will die
			return 'dead'

		for (var test_name in tests_results) {
			console.log(test_name, tests_results[test_name])
		}
	}

	const eval_domain = function (genreport_data) {
		if (genreport_data === undefined) {
			return 'test_error'
		}
		var nsip_results = []
		console.log('NS IP;NSID;result')
		for (var srv_idx in genreport_data) {
			var ns_result = eval_edns_strict(genreport_data[srv_idx]['tests'])
			nsip_results.push(ns_result)
			console.log(genreport_data[srv_idx]['address'] + ';' + genreport_data[srv_idx]['nsid'] + ';' + ns_result)
		}
		if (nsip_results.length === 0) {
			return 'test_error'
		}
		// all results are the same - nothing to analyze
		var all_same = nsip_results.every(nsres => nsres === nsip_results[0])
		if (all_same)
			return nsip_results[0]

		if (nsip_results.filter(nsres => nsres === 'dead').length > 0)
			// at least one NS is dead, fallback to other NS will be required
			return 'high_latency'
		else  // mix of ok and compatible NS -> compatible
			return 'compatible'
	}

	const createSingleResultElement = function ( /** @type {{}} */ json, /** @type {String} */ name ) {
		const element = document.createElement( 'div' );
		if ( name )
		{
			const title = document.createElement( 'strong' );
			title.appendChild( document.createTextNode( name ) );
			element.appendChild( title );
		}

		const span = document.createElement( 'span' );
		const test_result = eval_domain(json['data'])
		switch (test_result) {
			case 'ok':
				span.innerHTML = domainCheckerInit.texts.reportOkHtml;
				break;

			case 'compatible':
				span.innerHTML = domainCheckerInit.texts.reportCompatibleHtml;
				break;

			case 'high_latency':
				span.innerHTML = domainCheckerInit.texts.reportHighLatencyHtml;
				break;

			case 'dead':
				span.innerHTML = domainCheckerInit.texts.reportFailHtml;
				break;

			case 'test_error':
				span.innerHTML = domainCheckerInit.texts.reportTestErrorHtml;
				break;

		}
		element.appendChild( span );

		if ( json.status !== 'ok' && json.report )
		{
			if ( typeof domainCheckerInit.texts.reportLinkText !== UNDEFINED && domainCheckerInit.texts.reportLinkText )
			{
				element.appendChild( document.createTextNode( domainCheckerInit.texts.reportLinkText ) );
			}
			const link = document.createElement( 'a' );
			link.href = json.report;
			link.onclick = function () {
				return !window.open( this.href );
			};
			link.appendChild( document.createTextNode( json.report ) );
			element.appendChild( link );
		}

		return element;
	}

	const formOnSubmit = function ( /** @type {Event} */ event ) {
		event.preventDefault();

		/** @type {HTMLFormElement} */
		const eventTarget = ( event.target );

		/** @type {HTMLFieldSetElement} */
		const fieldset = eventTarget.firstElementChild;

		const list = eventTarget.elements[ INPUT_NAME ].value.split( DIVIDERS_REGEXP );

		let submitElement;
		for ( const i in eventTarget.elements )
		{
			if (
				eventTarget.elements[ i ].nodeType === Node.ELEMENT_NODE
				&& eventTarget.elements[ i ].nodeName === INPUT_NODE_NAME
				&& eventTarget.elements[ i ].type === SUBMIT_TYPE
			)
			{
				submitElement = eventTarget.elements[ i ];
				break;
			}
		}

		let resultsElement = document.createElement( 'div' );
		if ( fieldset.lastElementChild.id === RESULTS_ID )
		{
			resultsElement = fieldset.lastElementChild;
			while ( resultsElement.lastChild ) // delete old results
			{
				resultsElement.removeChild( resultsElement.lastChild );
			};
		} else
		{
			resultsElement.id = RESULTS_ID;
		}

		submitElement.disabled = true;
		const timeout = window.setTimeout( function () {
			submitElement.disabled = false;
		}, SUBMIT_ENABLE_AFTER );

		const statusElement = document.createElement( 'small' );
		statusElement.appendChild( document.createTextNode( domainCheckerInit.status.loading ) );
		resultsElement.appendChild( statusElement );
		fieldset.appendChild( resultsElement );

		list.forEach( function ( /** @type {String} */ zone ) {

			if ( zone )
			{
				const url = API_URL;
				url.searchParams.set( INPUT_NAME, zone );
				url.searchParams.set( PARAM_JSON_NAME, PARAM_JSON_VALUE );

				fetch( url, {
					method: API_METHOD,
					headers: {
						'Accept': 'application/json',
					},
				} ).then( function ( /** @type {Response} */ response ) {
					submitElement.disabled = false;
					clearTimeout( timeout );

					if ( response.status === 200 )
					{
						return response.json();
					} else if ( response.status == 429 ) {
						return Promise.reject(new Error(domainCheckerInit.status.rateLimit));
					} else if ( response.status == 403 ) {
						return Promise.reject(new Error(domainCheckerInit.status.errorBan));
					}
					return Promise.reject(new Error(domainCheckerInit.status.errorApi));
				} ).then( function ( /** @type {{}} */ json ) {
					resultsElement.appendChild( createSingleResultElement( json, zone ) );
					fieldset.appendChild( resultsElement );

					if ( ( resultsElement.children.length - 1 ) >= list.length ) // ( -1 ) is for status element
					{
						submitElement.disabled = false;
						clearTimeout( timeout );
						statusElement.replaceChild( document.createTextNode( domainCheckerInit.status.done ), statusElement.firstChild );
					}

				} ).catch( function ( /** @type {Error | SyntaxError} */ error ) {
					submitElement.disabled = false;
					clearTimeout( timeout );
					const errmsg = document.createElement( 'span' );
					errmsg.innerHTML = error.message;
					statusElement.replaceChild( errmsg, statusElement.firstChild );
				} );
			}
		} );

		return true;
	};

	/** @type {HTMLElement} */
	const intoElement = domainCheckerInit.placeIntoElement;

	let rootFormElement = document.createElement( ROOT_NODE_NAME );
	if (
		intoElement.firstElementChild
		&& intoElement.firstElementChild.nodeType === Node.ELEMENT_NODE
		&& intoElement.firstElementChild.nodeName === ROOT_NODE_NAME
	)
	{
		rootFormElement = intoElement.firstElementChild;
		rootFormElement.addEventListener( 'submit', formOnSubmit, false );
		rootFormElement.elements[ INPUT_NAME ].removeAttribute( 'pattern' );
	} else
	{
		rootFormElement.action = API_URL;
		rootFormElement.method = API_METHOD;
		rootFormElement.target = '_blank';

		const fieldset = document.createElement( 'fieldset' );
		if ( typeof domainCheckerInit.texts.formTitle !== UNDEFINED && domainCheckerInit.texts.formTitle )
		{
			const legend = document.createElement( 'legend' );
			legend.appendChild( document.createTextNode( domainCheckerInit.texts.formTitle ) );
			fieldset.appendChild( legend );
		}
		const inputTextLabel = document.createElement( 'label' );
		inputTextLabel.htmlFor = INPUT_NAME;
		if ( typeof domainCheckerInit.texts.labelText !== UNDEFINED && domainCheckerInit.texts.labelText )
		{
			inputTextLabel.appendChild( document.createTextNode( domainCheckerInit.texts.labelText ) );
		}

		const inputText = document.createElement( INPUT_NODE_NAME );
		inputText.type = 'text';
		inputText.required = true;
		inputText.name = INPUT_NAME;
		inputText.id = INPUT_NAME;

		inputTextLabel.appendChild( inputText );

		fieldset.appendChild( inputTextLabel );

		const submit = document.createElement( INPUT_NODE_NAME );
		submit.type = SUBMIT_TYPE;
		if ( typeof domainCheckerInit.texts.submitText !== UNDEFINED && domainCheckerInit.texts.submitText )
		{
			submit.value = domainCheckerInit.texts.submitText;
		}

		fieldset.appendChild( submit );

		rootFormElement.appendChild( fieldset );

		rootFormElement.onsubmit = formOnSubmit;
		domainCheckerInit.placeIntoElement.appendChild( rootFormElement );
	}

} )(domainCheckerInit);
};
