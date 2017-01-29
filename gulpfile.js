var gulp = require('gulp');
var util = require('gulp-util');
var plumber = require('gulp-plumber');

// for less
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var sourceMaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

// for js, webpack
var webpack = require('gulp-webpack');
var strip = require('gulp-strip-comments');
var htmlmin = require('gulp-htmlmin');
var templates = require('gulp-angular-templatecache');

var browserSync = require('browser-sync').create();

var production = !!util.env.production;

gulp.task('css', function () {
    var plugins = [];
    if(production) {
        plugins.push(new LessPluginAutoPrefix({browsers: ['> 5%']}));
    }

    var stream = gulp.src('./app/src/app.less')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(less({
            relativeUrls: true,
            plugins: plugins,
            paths: [
                './app/src/',
                './node_modules/bootstrap-less',
                './node_modules/bootswatch-less/bootswatch'
            ]
        }))
        .pipe(rename(production ? 'build.min.css' : 'build.css'));

    if(production) {
        stream = stream.pipe(cleanCSS({
            compatibility: 'ie8',
            keepSpecialComments : 0
        }));
    } else {
        stream = stream.pipe(sourceMaps.write('.'));
    }

    return stream
        .pipe(gulp.dest('./app/dist'))
        .pipe(browserSync.stream({
            match: '**/*.css'
        }));
});

var stringToStream = function stringToStream(filename, string) {
    var src = require('stream').Readable({ objectMode: true });
    src._read = function () {
        this.push(new util.File({
            cwd: "",
            base: "",
            path: filename,
            contents: new Buffer(string)
        }));
        this.push(null)
    };
    return src;
};

gulp.task('templates', function () {
    var stream;

    if(production) {
        stream = gulp.src('./app/src/**/*.html');
    } else {
        stream = stringToStream('empty.html', '');
    }

    stream.pipe(htmlmin({
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        //      decodeEntities: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true
    }))
        .pipe(templates('app.templates.js', {
            module: 'app.templates',
            moduleSystem: 'Browserify',
            root: 'src/',
            standalone: true
        }))
        .pipe(gulp.dest('./app/src/'));

});

var webpackWatch = false;
gulp.task('js', ['templates'], function () {

    var config = {
        watch: webpackWatch,
        output: {
            filename: 'build.js'
        },
        devtool: 'source-map',
        plugins: []
    };

    if(production) {
        var ClosureCompiler = require('google-closure-compiler-js').webpack;

        config.plugins.push(
            new ClosureCompiler({
                options: {
                    languageIn: 'ECMASCRIPT5_STRICT',
                    languageOut: 'ECMASCRIPT5_STRICT',
                    compilationLevel: 'SIMPLE',
                    warningLevel: 'QUIET',
                    angularPass: true
                },
                concurrency: 3
            })
        );

        config.output.filename = 'build.min.js';
        config.debug = false;
        config.devtool = false;
    }

    var stream = gulp.src('./app/src/app.js')
        .pipe(webpack(config));

    if(production) {
        stream.pipe(strip());
    }

    stream.pipe(gulp.dest('./app/dist'))
        .pipe(browserSync.stream());

    return stream;
});

gulp.task('fonts', function () {
    gulp.src([
         './node_modules/bootstrap-less/fonts/*'
    ])
    .pipe(gulp.dest('./app/fonts/'));

});

gulp.task('build', ['css', 'js', 'fonts']);

gulp.task('watch', function () {
    browserSync.init({
        open: false,
        server: "./app"
    });

    gulp.watch('app/src/**/*.less', ['css']);

    webpackWatch = true;
    gulp.start('js');

});

