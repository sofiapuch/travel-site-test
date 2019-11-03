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
    styles: {
        src: {
            global: 'src/styles/**/*.scss',
            components: 'src/components/**/*.scss'
        },
        dist: 'dist/styles/'
    },
    js: {
        src: 'src/components/**/*.js',
        dist: 'dist/scripts/'
    },
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

export function clean( cb ) {
    return del( ['dist/*'], cb );
}

export function webserver() {
    return connect.server( {
        root: './dist',
        host: 'localhost',
        port: 8080,
        livereload: true
    } );
}

export function html() {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
}

export function mainScripts() {
    return gulp.src('./src/app.js')
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest( paths.js.dist))
        .pipe( concat('main.min.js'))
        .pipe(gulp.dest(paths.js.dist));
}

export function commonScripts() {
    return gulp.src('src/common-scripts/**/*.js')
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('common.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest( paths.js.dist))
        .pipe( concat('common.min.js'))
        .pipe(gulp.dest(paths.js.dist));
}

export function componentScripts() {
    return gulp.src(paths.js.src)
        .pipe( sourcemaps.init())
        .pipe( babel() )
        .on('error', error => console.log( error))
        .pipe(concat('components.js'))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest( paths.js.dist))
        .pipe( concat('components.min.js'))
        .pipe(gulp.dest(paths.js.dist));
}

export function vendors() {
    return gulp.src(paths.vendors.development)
        .pipe( concat('vendors.js'))
        .pipe( gulp.dest('dist/scripts/'))
}

export function styles() {
    return gulp.src(paths.styles.src.global)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dist))
        .pipe(connect.reload());
}

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
