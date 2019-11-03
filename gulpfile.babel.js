/* Build Script */

import gulp from 'gulp';
import del from 'del';

// webserver
import connect from 'gulp-connect';

// scripts
import babel from 'gulp-babel';
import concat from 'gulp-concat';

// styles
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

//sprites
import svgSprite from 'gulp-svg-sprite';

const paths = {
    vendors : {
        "development" : [
            "./node_modules/underscore/underscore.js",
            "./node_modules/moment/moment.js"
        ],
        "production" : [
            "./node_modules/underscore/underscore-min.js",
            "./node_modules/moment/min/moment.min.js"
        ]
    }
};

const iconConfig = {
    shape : {
        dimension : {
            maxWidth: 30,
            maxHeight: 30
        }
    },
    mode : {
        symbol : {
            sprite : "../icons.svg",
            dimensionAttributes : true
        }
    },
    svg : {
        xmlDeclaration: false,
        doctypeDeclaration: false
    }
};

// Clean dist folder
export function clean( cb ) {
    return del( ['dist/*'], cb );
}

// Runs local server
export function webserver() {
    return connect.server( {
        root: './dist',
        host: 'localhost',
        port: 8080,
        livereload: true
    } );
}

// Copy index file into dist folder
export function html() {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
}

// Builds main scripts
export function mainScripts() {
    return gulp.src('./src/app.js')
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest('dist/scripts/'))
        .pipe( concat('main.min.js'))
        .pipe(gulp.dest('dist/scripts/'));
}

// Build common scripts
export function commonScripts() {
    return gulp.src('src/common-scripts/**/*.js')
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('common.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest('dist/scripts/'))
        .pipe( concat('common.min.js'))
        .pipe(gulp.dest('dist/scripts/'));
}

// Build component scripts
export function componentScripts() {
    return gulp.src('src/components/**/*.js')
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('components.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest('dist/scripts/'))
        .pipe( concat('components.min.js'))
        .pipe(gulp.dest('dist/scripts/'));
}

// Bundles vendors js
export function vendors() {
    return gulp.src(paths.vendors.development)
        .pipe( concat('vendors.js'))
        .pipe( gulp.dest('dist/scripts/'))
}

// Build styles
export function styles() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(connect.reload());
}

// Build svgs into the dist folder
export function icons() {
    return gulp.src('src/assets/icons/*.svg')
    .pipe(svgSprite(iconConfig))
    .pipe(gulp.dest('dist/assets/svg-output/'))
    .pipe(connect.reload());
}

const buildScripts = gulp.parallel( mainScripts, commonScripts, componentScripts );
const buildDefault = gulp.series( clean, gulp.parallel( html, styles, icons, buildScripts ), vendors );

// Default task
export default buildDefault;
