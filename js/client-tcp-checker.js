var clientTcpChecker = function(init) {
(function(init) {
    $('#client-tcp').submit(function(event) {
        console.log('start');

        $('#client-tcp-loading-area').append('<img></img>');
        var img = $('#client-tcp-loading-area img:last-child');
        img.on('load', function () {
            $('#client-tcp-loading-area').append('<img></img>');
            var img = $('#client-tcp-loading-area img:last-child');
            img.on('load', function () {
                $('#client-tcp input[type="submit"]').attr('disabled', false);
                console.log('load OK');
                $('#client-tcp-checker-status').text(init.status.done);
                $('#client-tcp-checker-result').html(init.texts.reportOkHtml);
            });
            img.on('error', function (e) {
                $('#client-tcp input[type="submit"]').attr('disabled', false);
                console.log('load FAIL');
                $('#client-tcp-checker-status').text(init.status.done);
                $('#client-tcp-checker-result').html(init.texts.reportFailHtml);
            });

            img.attr('src', 'http://dnsflagdaytcp.cmdns.dev.dns-oarc.net/dot.png');
            console.log('loading');
            $('#client-tcp-checker-status').text(init.status.loading);
        });
        img.on('error', function (e) {
            $('#client-tcp input[type="submit"]').attr('disabled', false);
            console.log('network problem');
            $('#client-tcp-checker-status').text(init.status.done);
            $('#client-tcp-checker-result').html(init.texts.reportNetworkProblemHtml);
        });

        $('#client-tcp input[type="submit"]').attr('disabled', true);
        img.attr('src', 'http://cmdns.dev.dns-oarc.net/dot.png');
        console.log('checking network');
        $('#client-tcp-checker-status').text(init.status.checkNetwork);

        event.preventDefault();
    });
})(init);
}
