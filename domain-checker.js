'use strict';
( function () {
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


	const createSingleResultElement = function ( /** @type {{}} */ json, /** @type {String} */ name ) {
		const element = document.createElement( 'div' );
		if ( name )
		{
			const title = document.createElement( 'strong' );
			title.appendChild( document.createTextNode( name ) );
			element.appendChild( title );
		}

		const span = document.createElement( 'span' );
		span.innerHTML = ( json.status === 'ok' ) ? domainCheckerInit.texts.reportOkHtml : domainCheckerInit.texts.reportFailHtml;
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
					if ( response.ok && ( response.status === 200 ) )
					{
						return response.json();
					}
					submitElement.disabled = false;
					clearTimeout( timeout );
					statusElement.replaceChild( document.createTextNode( domainCheckerInit.status.errorApi ), statusElement.firstChild );
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
					statusElement.replaceChild( document.createTextNode( domainCheckerInit.status.errorInput ), statusElement.firstChild );
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

} )();
