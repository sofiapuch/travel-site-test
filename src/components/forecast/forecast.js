(function( app, common ) {

    const APP_ID = 'f5d5b41222947bf6188ab7e71e3dfe08';
    const SUCCESS = '200';
    const ERROR = '404';

    /**
     * Iterates over forecast list to find data for 4 consecutive days
     * @param {Array} list array of forecast items
     * @return {Array} list of 4 forecast items
     */
    const _getConsecutiveDays = ( list ) => {

        if ( list.length === 0 ) {
            return [];
        }

        let newList = [];

        // loop through the whole list and break when 4 items available
        // no need to loop through the whole array
        for ( let i=0; i < list.length; i++ ) {

            const currentDate = common.Helpers.getFormattedDate( list[i].dt_txt, "DD/MM/YYYY" );
            const nextDate = common.Helpers.getFormattedDate( list[i+1].dt_txt, "DD/MM/YYYY" )

            // if it's not the same day, push to new array
            if ( !moment( currentDate ).isSame( nextDate , 'day' )  ) {
                newList.push( list[i]);

                // if 4 items already, break the loop
                if ( newList.length === 4 ) {
                    break;
                }
            }
        }

        return newList;
    }

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
        this.initComponent( this.element.dataset.location );

        // Data attribute that specifies if element should be updated by the search bar
        const willUpdate = this.element.dataset.updates === "true" ? true : false;
        if ( willUpdate ) {
            this.setListeners();
        }
    };

    /**
     * Requests data from the OpenWeather API ( https://openweathermap.org/forecast5 )
     * @param {String} location from where to get the weather forecast
     */
    app.Forecast.prototype.initComponent = function( location ) {

        const URL = common.Helpers.getForecastURL( location, APP_ID );

        //Request data from common method
        common.RequestData( 'GET', URL, this.onData.bind(this) );
    };

    /**
     * Listen for events
     */
     app.Forecast.prototype.setListeners = function() {

         // custom event that gets fired by the search bar component
         document.addEventListener( 'locationHandler', ( event ) => {
             // re-init component again
             this.initComponent( event.detail );
         } );
     };

    /**
     * Get response from API Request
     * @param {Object} response api response
     */
    app.Forecast.prototype.onData = function( response ) {

        if ( !response ) {
            return;
        }

        if ( response.cod === SUCCESS && response.list ) {

            const model = {
                itemList: _getConsecutiveDays( response.list )
            }

            this.renderTemplate( model );
        } else if ( response.cod === ERROR ) {
            this.element.innerText = "Weather Forecast not Found";
        }
    };

    /**
     * Render underscore template
     * @param {Object} model data model that will be sent to the template
     * and interpreted by underscore
     */
    app.Forecast.prototype.renderTemplate = function( model ) {

        // See card template under forecast/templates/card.html
        const templateBlock = '<% _.each( itemList, function( item ) { %><div class="col-3"><div class="card card--<%= common.Helpers.getCardModifier( item.weather[0].description ) %>"><div class="card__bg-icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg-output/icons.svg#<%= item.weather[0].icon %>"></use></svg></div><p class="card__date"><%= common.Helpers.getFormattedDate( item.dt_txt, "dddd Do" ) %></p><div class="card__info-wrapper"><div class="card__icon"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/svg-output/icons.svg#<%= item.weather[0].icon %>"></use></svg></div><p class="card__text"><%= item.weather[0].description %></p><p class="card__temp card__temp--celsius"><%= Math.round(item.main.temp) %><span>&#176;C</span></p><p class="card__temp card__temp--fahrenheit"><%= common.Helpers.celsiusToFahrenheit(item.main.temp) %><span>&#176;F</span></p></div></div></div><% }); %>';

        common.Helpers.renderTemplate( this.element, _.template( templateBlock ), model );
    };

    // Get Forecast component from the DOM
    const components = document.querySelectorAll( '[data-component="forecast"]' );
    for ( let c = 0; c < components.length; c++ ) {
        new app.Forecast( components[c] );
    }

}( app, common ));
