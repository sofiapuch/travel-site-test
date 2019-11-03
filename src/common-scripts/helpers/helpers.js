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

}( common ));
