(function( app ) {

    app.ApiRequest = function ApiRequest() {

        this.httpRequest = new XMLHttpRequest();

        if ( !this.httpRequest ) {
            //do something
        }

        this.makeRequest();
    };

    app.ApiRequest.prototype.makeRequest = function makeRequest() {

        const method = 'GET';
        const url = 'https://api.openweathermap.org/data/2.5/forecast?q=München&appid=f5d5b41222947bf6188ab7e71e3dfe08';

        this.httpRequest.onreadystatechange = this.getResponse.bind(this);
        this.httpRequest.open( method, url );
        this.httpRequest.send();
    };

    app.ApiRequest.prototype.getResponse = function getResponse() {

        if ( this.httpRequest.readyState === XMLHttpRequest.DONE ) {

            if ( this.httpRequest.status === 200 ) {

                const model = JSON.parse( this.httpRequest.responseText );
                const rootWrapper = document.getElementById('root');

                const testUnderscore = _.template(
                    "<p class='city__name'><%= cityName %></p>"
                );
                rootWrapper.innerHTML = testUnderscore( {cityName: model.city.name});

            } else {
                console.log( 'There was a problem with the request.' );
            }
        }
    };

    new app.ApiRequest();

}( app ));
