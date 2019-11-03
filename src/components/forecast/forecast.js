(function( app, common ) {

    const APP_ID = 'f5d5b41222947bf6188ab7e71e3dfe08';
    const SUCCESS = '200';

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
    };

    /**
     * Requests data from the OpenWeather API ( https://openweathermap.org/forecast5 )
     */
    app.Forecast.prototype.initComponent = function() {

        const URL = common.Helpers.getForecastURL( 'London', APP_ID );

        //Request data from common method
        common.RequestData( 'GET', URL, this.onData.bind(this) );
    };

    /**
     * Get response from API Request
     */
    app.Forecast.prototype.onData = function( response ) {

        if ( response && response.cod === SUCCESS && response.list ) {

            const model = {
                // We need to render only 4 forecast items
                itemList: response.list.slice(0, 4)
            }

            this.renderTemplate( model );
        }
    };

    /**
     * Render underscore template
     */
    app.Forecast.prototype.renderTemplate = function( model ) {

        const templateBlock = '<% _.each( itemList, function( item ) { %><div class="col-3"><div class="card card--clear-sky"><div class="card__bg-icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg-output/icons.svg#<%= item.weather[0].icon %>"></use></svg></div><p class="card__date">Today 15th</p><div class="card__info-wrapper"><div class="card__icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg-output/icons.svg#<%= item.weather[0].icon %>"></use></svg></div><p class="card__text"><%= item.weather[0].description %></p><p class="card__temp card__temp--celsius">22<span>*C</span></p><p class="card__temp card__temp--farenheight">72<span>*F</span></p></div></div></div><% }); %>';

        common.Helpers.renderTemplate( this.element, _.template( templateBlock ), model );
    };

    // Get Forecast component from the DOM
    const component = document.querySelector( '[data-component="forecast"]' );
    if ( component ) {
        new app.Forecast( component );
    }

}( app, common ));
