var tcpChecker = function(init) {
(function(init) {
    $('#tcp-checker').submit(function(event){
        console.log('test starting');
        $('#tcp-checker input[type="submit"]').attr('disabled', true);
        $('#tcp-checker-result, #tcp-checker-report').text('');
        var zone = $('#tcp-checker input[type="text"]').val();
	var tcp_hard_breakage_types = ['timeout', 'failed', 'reset',
		'connection-refused', 'eof', 'malformed', 'mismatch',
		'rcode15', 'servfail', 'refused', 'nxdomain']

	const dict_to_values = function (dict) {
		var values = []
		for (var key in dict) {
			values.push(dict[key])
		}
		return values
	}

	// eval one server
	const eval_tcp_strict = function (tests_results) {
		// strip test names -> array of arrays with test results
		var test_values = dict_to_values(tests_results)
		var all_ok = test_values.every(results => results.indexOf('ok') !== -1)
		if (all_ok)
			return 'ok'

		// check if TCP or simple UDP query have one of blacklisted results
		for (var key in tests_results) {
			if (key === 'edns512tcp' || key === 'do') {
				for (var resultidx in tests_results[key]) {
					if (tcp_hard_breakage_types.includes(tests_results[key][resultidx])) {
						// TCP or simple UDP query on this IP does not work, die
						return 'dead'
					}
				}
			}
		}
		// the IP is not 100% compliant but does not break horribly
		return 'compatible'
	}

	const eval_domain = function (genreport_data) {
		if (genreport_data === undefined) {
			return 'test_error'
		}
		var nsip_results = []
		console.log('NS IP;NSID;result')
		for (var srv_idx in genreport_data) {
			var ns_result = eval_tcp_strict(genreport_data[srv_idx]['tests'])
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
        $.ajax('https://ednscomp.isc.org/ednscomp', {
            data: {
                    zone: zone,
                    json: true,
            },
        })
        .done(function(data) {
            $('#tcp-checker input[type="submit"]').attr('disabled', false);
            console.log('Request Successful:');
            console.log(data);
            $('#tcp-checker-status').text(init.status.done);

            var domain = $('<span><strong></strong></span>');
            $('strong', domain).text(zone);

    	    const test_result = eval_domain(data.data)
	    if (test_result == 'test_error') {
	        $('#tcp-checker-result').html(domain.html()+init.texts.reportTestErrorHtml);
	    } else if (test_result == 'dead') {
	        $('#tcp-checker-result').html(domain.html()+init.texts.reportFailHtml);
	    // data.errors => some NS names cannot be resolved to an IP address
	    } else if (test_result == 'high_latency' || data.errors) {
	        $('#tcp-checker-result').html(domain.html()+init.texts.reportHighLatencyHtml);
	    } else if (test_result == 'compatible') {
	        $('#tcp-checker-result').html(domain.html()+init.texts.reportWarningHtml);
	    } else if (test_result == 'ok') {
	        $('#tcp-checker-result').html(domain.html()+init.texts.reportOkHtml);
	    }

            $('#tcp-checker-report').html('<span></span><a href="" target="_blank"></a>');
            $('#tcp-checker-report > span').text(init.texts.reportLinkText);
            $('#tcp-checker-report > a')
            .text(data.report)
            .attr('href', data.report);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $('#tcp-checker input[type="submit"]').attr('disabled', false);
            console.log('Request Failed:');
            console.log(jqXHR);
            console.log('textStatus: '+textStatus);
            console.log('errorThrown: '+errorThrown);
            switch (jqXHR.status) {
            case 429:
                $('#tcp-checker-status').text(init.status.rateLimit);
                break;
            case 403:
                $('#tcp-checker-status').text(init.status.errorBan);
                break;
            default:
                $('#tcp-checker-status').text(init.status.errorApi);
                break;
            }
            var domain = $('<span><strong></strong></span>');
            $('strong', domain).text(zone);
            $('#tcp-checker-result').html(domain.html()+init.texts.reportTestErrorHtml);
        });
        $('#tcp-checker-status').text(init.status.loading);
        event.preventDefault();
    });
})(init);
}
