'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
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
    return '\/*\n * ' + commentData('\n * ', [ '', 'https://github.com/brcontainer/Victory.css' ]) + '\n *\/\n\n';
}

function releaseMinComment() {
    return '\/* ' + commentData(' | ') + ' *\/\n';
}

gulp.task('mergecss', () => {
    return gulp.src('./src/scss/victory.scss')
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(gulp.dest('./dist'));
});

gulp.task('prefix', () => {
    return gulp.src('./dist/victory.css')
                .pipe(postcss([
                    autoprefixer({ browsers: ['last 15 versions'] })
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

gulp.task('mergejs', () => {
    let src = [
        './src/js/victory.js',
        './src/js/_navbar.js',
        './src/js/_polyfill.js'
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

gulp.task('default', () => {
    runSequence('mergecss', 'prefix', 'mincss', 'mergejs', 'minjs');
});
