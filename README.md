# Travel Site
- Why gulp instead of webpack?
Personally I have more experience using gulp that why I chose it.
- This repo uses Underscore as templating engine ( https://underscorejs.org/ )
- Media Queries are handled by the package sass-mq ( https://www.npmjs.com/package/sass-mq )
- Moment.js is the library in charge of formatting dates ( https://momentjs.com/ )
- SVGgo has been used to clean the svg's from unnecessary properties ( https://jakearchibald.github.io/svgomg/ )
- Using normalize to override default browser settings ( github.com/necolas/normalize.css )

## Approach
- Repo setup
- Making sure API is available and does not give CORS issues
- Build first reusable component 'Forecast' that renders 4 results from the API
- Make 'httpRequest' functionality common, so it can be accessible from all components on the app
- Add 'common.Helpers' that will hold reusable methods and other helpers user by the
templating engine (Underscore), to render the API data in the needed format etc.
- Style the reusable component
- Iterate 'Forecast' so instead of rendering the first 4 results, it renders 4 consecutive days
- Add 'Search-Bar' component that will send a custom event to the DOM when a user introduces a
city on the text bar and hits 'Find'
- Iterate 'Forecast' to listen to custom event and initialise itself once more
- Add more 'Forecast' components into the index.html page that will render different Weather
Forecasts and that won't listen to the custom event ( controller by the data attributes 'data-location' & 'data-updates')
- Make sure the styling is responsive

## Nice to have
- Using city ids instead of names, provided by OpenWeatherMap ( http://bulk.openweathermap.org/sample/ ),
would made an app more consistent
- Form validation on the Search Bar
- Lazy Loading
- JS and SASS linters on the repo
- Unit testing (not much experience on it)
- Callbacks on error, not just logs or a simple message on screen
- Underscore template would work better built on top of the js file by a gulp task
- Watch tasks
- Split gulp tasks into multiple files

## Build notes
- Run npm install
- Run webserver and open http://localhost:8080/index.html

## Gulp tasks
`gulp`
Default task that builds the files into the dist folder

`gulp clean`
Removes content from dist folder

`gulp webserver`
Run local server on http://localhost:8080/index.html

`gulp html`
Builds index.html into the dist folder

`gulp scripts`
Builds scripts into the dist folder

`gulp mainScripts`
Builds app initialiser

`gulp commonScripts`
Builds common scripts

`gulp componentScripts`
Builds the components (modules) scripts

`gulp styles`
Builds styles into the dist folder

`gulp icons`
Build svgs into the dist folder
