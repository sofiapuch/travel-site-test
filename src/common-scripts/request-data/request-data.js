(function( common ) {

    /**
     * Handles http requests
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
            return callback( 'common.Request: httpRequest unavailable' );
        }

        makeRequest();

        function makeRequest() {
            httpRequest.onreadystatechange = getResponse;
            httpRequest.open( method, URL );
            httpRequest.send();
        }

        function getResponse() {

            if ( httpRequest.readyState === XMLHttpRequest.DONE ) {

                if ( httpRequest.status === 200 ) {
                    return callback( JSON.parse( httpRequest.responseText ) ); 
                } else {
                    return callback( 'common.Request: There was a problem with the request.' );
                }
            }
        }
    }

}( common ));
