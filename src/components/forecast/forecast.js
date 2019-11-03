(function( app, common ) {

    const APP_ID = 'f5d5b41222947bf6188ab7e71e3dfe08';

    /**
     * Shows weather forecast for a particular region
     * @constructor
     * @param {HTMLElement} element forecast component/wrapper
     */
    app.Forecast = function( element ) {

        if ( !element ) {
            return;
        }

        this.element = element;
        this.initComponent();
    }

    /**
     * Requests data from the OpenWeather API ( https://openweathermap.org/forecast5 )
     */
    app.Forecast.prototype.initComponent = function() {

        const URL = common.Helpers.getForecastURL( 'London', APP_ID );

        //Request data from common method
        common.RequestData( 'GET', URL, this.onData.bind(this) );
    }

    /**
     * Render Forecast if we get data successfully
     */
    app.Forecast.prototype.onData = function( response ) {

        // TODO: add checks/fallback for response

        //Do something on data
        console.log( 'Forecast.prototype.onData - response:', response );

        const testUnderscore = _.template(
            "<p class='city__name'><%= cityName %></p>"
        );
        this.element.innerHTML = testUnderscore( {cityName: response.city.name});

    }

    // Get Forecast component from the DOM
    const component = document.querySelector( '[data-component="forecast"]' );
    if ( component ) {
        new app.Forecast( component );
    }

}( app, common ));
