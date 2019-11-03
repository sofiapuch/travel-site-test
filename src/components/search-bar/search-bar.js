(function( app, common ) {

    /**
     * Search Bar to find weather for a particular location
     * @constructor
     * @param {HTMLElement} element forecast component/wrapper
     */
    app.SearchBar = function( element ) {

        if ( !element ) {
            return;
        }

        this.element = element;
        this.config = {
            input: element.querySelector( '.js-location-input' ),
            button: element.querySelector( '.js-location-button' )
        };

        this.setListeners();
    };

    /**
     * Adds event listeners to search button
     */
    app.SearchBar.prototype.setListeners = function() {

        if ( !this.config.button || !this.config.input ) {
            return;
        }

        // it would be better to handle multiple event listeners to capture
        // the keyboard's enter button
        this.config.button.addEventListener( 'click', () => {
            common.Helpers.dispatchCustomEvent( 'locationHandler', this.config.input.value );
        });
    };

    // Get Forecast component from the DOM
    const component = document.querySelector( '[data-component="search-bar"]' );
    if ( component ) {
        new app.SearchBar( component );
    }

}( app, common ));
