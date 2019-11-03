(function( common ) {

    /**
     * Handles http requests - would be good to get errorCallback too
     * @param {String} method defaults to 'GET'
     * @param {String} URL endpoint
     * @param {}
     * @return {}
     */
    common.RequestData = function RequestData( method, URL, callback ) {

        if ( !callback ) {
            console.warn( 'common.Request: No callback provided' );
            return;
        }

        const httpRequest = new XMLHttpRequest();

        if ( !httpRequest ) {
            console.warn( 'common.Request: httpRequest unavailable' );
        }

        makeRequest();

        function makeRequest() {
            httpRequest.onreadystatechange = getResponse;
            httpRequest.open( method, URL );
            httpRequest.send();
        }

        function getResponse() {

            if ( httpRequest.readyState === XMLHttpRequest.DONE ) {

                if ( httpRequest.status === 200 || httpRequest.status === 404 ) {
                    return callback( JSON.parse( httpRequest.responseText ) );
                } else {
                    console.warn( 'common.Request: There was a problem with the request.' );
                }
            }
        }
    }

}( common ));
