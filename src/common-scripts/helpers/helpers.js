(function( common ) {

    // Create Helpers object if it doesn't exist yet (we could have multiple helpers file)
    if ( !common.Helpers ) {
        common.Helpers = {};
    }

    /**
     * Returns Forecast URL
     * @param {String} location city from where to return the forecast
     * @param {String} appID id needed to successfuly access the endpoint
     * @return {String} returns the forecast endpoint
     */
    common.Helpers.getForecastURL = ( location, appID ) => {

        if ( !location || !appID ) {
            return null;
        }
        return `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${appID}&units=metric`;
    };

    /**
     * Render underscore template into index.html
     * @param {HTMLElement} element html element/wrapper where to render the template
     * @param {String} template html in string format that will be rendered
     * @param {Object} model data that will be passed to the template
     */
    common.Helpers.renderTemplate = function( element, template, model ) {

        if ( !element || !template || !model ) {
            console.warn( 'common.Helpers.renderTemplate - Template cannot be rendered.')
            return;
        }

        element.innerHTML = template( model );
    };

    /**
     * Returns modifier that will be applied to the weather card,
     * depending on the weather description
     * @param {String} description weather description to be returned as modifier
     * @return {String} sass modifier
     */
    common.Helpers.getCardModifier = function( description ) {

        if ( !description ) {
            return '';
        }

        return description.replace( ' ', '-' );
    };

    /**
     * Gets date string and applies given format with momentjs
     * @param {String} dateString date string with format "YYYY-MM-DD HH:mm:ss"
     * param {String} format how do we want to get the date
     * @return {String} formatted date
     */
    common.Helpers.getFormattedDate = function( dateString, format ) {

        if ( !dateString ) {
            return '';
        }

        const momentObject = moment( dateString, "YYYY-MM-DD HH:mm:ss" );
        return momentObject.format( format );
    };

    /**
     * Transform celsius to fahrenheit
     * @param {String} celsius degrees in celsius
     */
     common.Helpers.celsiusToFahrenheit = function( celsius ) {

         if ( !celsius ) {
             return '';
         }

         return Math.round( ( celsius * 9/5 ) + 32 );
     };

     /**
      * Dispatch custom event
      * @param {String} type The type of the event
      * @param {String} detail event detail
      * @param {DOMElement} target The target or document if not specified
      */
     common.Helpers.dispatchCustomEvent = function( type, detail, target ) {

         const event = new CustomEvent( type, {
             bubbles: true,
             cancelable: false,
             detail: detail || null
         } );

         const eventTarget = target || document;
         eventTarget.dispatchEvent( event );
     }

}( common ));
