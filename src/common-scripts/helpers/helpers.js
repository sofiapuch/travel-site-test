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
        return `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${appID}`;
    }

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
    }

}( common ));
