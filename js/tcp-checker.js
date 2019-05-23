var tcpChecker = function(init) {
(function(init) {
    $('#tcp-checker').submit(function(event){
        console.log('test starting');
        $('#tcp-checker input[type="submit"]').attr('disabled', true);
        $('#tcp-checker-result, #tcp-checker-report').text('');
        var zone = $('#tcp-checker input[type="text"]').val();
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

            if (data.errors) {
                $('#tcp-checker-result').html(domain.html()+init.texts.reportTestErrorHtml);
            } else {
                var anyErr = 0;
                $(data.data).each(function(idx, ns){
                    console.log(ns.address+' '+ns.tests.edns512tcp[0]);
                    if (ns.tests.edns512tcp[0] != "ok") {
                        anyErr++;
                    }
                });
                if (anyErr) {
                    $('#tcp-checker-result').html(domain.html()+init.texts.reportWarningHtml);
                } else {
                    $('#tcp-checker-result').html(domain.html()+init.texts.reportOkHtml);
                }
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
