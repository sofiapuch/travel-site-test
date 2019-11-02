(function( app ) {

    app.Example = function Example() {

        const root = document.getElementById('root');

        if (!root) {
            return;
        }

        console.log( 'rootElement', root );

        this.helloWorld();
    }

    app.Example.prototype.helloWorld = function helloWorld() {
        console.log( 'hello World' );
    }

    new app.Example();

}( app ));
