'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var header = require('gulp-header');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var injectString = require('gulp-inject-string');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var runSequence = require('run-sequence');

var buildDate = (new Date).getUTCFullYear();
var packageData = JSON.parse(fs.readFileSync('./package.json'));

runSequence.options.ignoreUndefinedTasks = true;

function commentData(glue, extras) {
    let data = [
        `${packageData.name} ${packageData.version}`,
        `Copyright (c) ${buildDate} ${packageData.author} (${packageData.email})`,
        `Released under the ${packageData.license} license`
    ];

    if (extras) data = data.concat(extras);

    return data.join(glue);
}

function releaseComment() {
    return '\/*\n * ' + commentData('\n * ', [ '', 'https://github.com/brcontainer/victory.css' ]) + '\n *\/\n\n';
}

function releaseMinComment() {
    return '\/* ' + commentData(' | ') + ' *\/\n';
}

/* Default CSS project */
gulp.task('mergecss', () => {
    return gulp.src('./src/scss/victory.scss')
                .pipe(header('$slim: false;\n'))
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(gulp.dest('./dist'));
});

gulp.task('prefix', () => {
    return gulp.src('./dist/victory.css')
                .pipe(postcss([
                    autoprefixer()
                ]))
                .pipe(injectString.prepend(releaseComment()))
                .pipe(gulp.dest('./dist'));
});

gulp.task('mincss', () => {
    return gulp.src('./dist/victory.css')
                .pipe(cleanCSS({ compatibility: 'ie8' }))
                .pipe(rename({ suffix: '.min' }))
                .pipe(injectString.prepend(releaseMinComment()))
                .pipe(gulp.dest('./dist'));
});

/* Default JS project */
gulp.task('mergejs', () => {
    let src = [
        './src/js/victory.js',
        './src/js/_polyfill.js',
        './src/js/_navbar.js',
        './src/js/_slide.js'
    ];

    return gulp.src(src)
                .pipe(concat('victory.js'))
                .pipe(injectString.prepend(releaseComment()))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('minjs', () => {
    return gulp.src('./dist/victory.js')
                .pipe(minify({
                    ext: { min: '.min.js' }
                }))
                .pipe(gulp.dest('./dist'));
});

/* Slim CSS project */
gulp.task('slim-mergecss', () => {
    return gulp.src('./src/scss/victory.scss')
                .pipe(header('$slim: true;\n'))
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(rename({ suffix: '-slim' }))
                .pipe(injectString.prepend(releaseComment()))
                .pipe(gulp.dest('./dist'));
});

gulp.task('slim-mincss', () => {
    return gulp.src('./dist/victory-slim.css')
                .pipe(cleanCSS())
                .pipe(rename({ suffix: '.min' }))
                .pipe(injectString.prepend(releaseMinComment()))
                .pipe(gulp.dest('./dist'));
});

/* Slim CSS project */
gulp.task('slim-mergejs', () => {
    let src = [
        './src/js/victory.js',
        './src/js/_navbar.js',
        './src/js/_slide.js'
    ];

    return gulp.src(src)
                .pipe(concat('victory-slim.js'))
                .pipe(injectString.prepend(releaseComment()))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('slim-minjs', () => {
    return gulp.src('./dist/victory-slim.js')
                .pipe(minify({
                    ext: { min: '.min.js' }
                }))
                .pipe(gulp.dest('./dist'));
});

gulp.task('default', () => {
    runSequence(
        'mergecss', 'prefix', 'mincss', 'mergejs', 'minjs',
        'slim-mergecss', 'slim-mincss', 'slim-mergejs', 'slim-minjs'
    );
});
