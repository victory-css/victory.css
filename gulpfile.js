'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
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

gulp.task('merge', () => {
    return gulp.src('./src/victory.scss')
                .pipe(sass.sync().on('error', sass.logError))
                .pipe(gulp.dest('./dist'));
});

gulp.task('prefix', () => {
    return gulp.src('./dist/victory.css')
                .pipe(postcss([
                    autoprefixer({ browsers: ['last 2 versions'] })
                ]))
                .pipe(injectString.prepend(releaseComment()))
                .pipe(gulp.dest('./dist'));
});

gulp.task('min', () => {
    return gulp.src('./dist/victory.css')
               .pipe(cleanCSS({compatibility: 'ie8'}))
               .pipe(rename({suffix: '.min'}))
               .pipe(injectString.prepend(releaseMinComment()))
               .pipe(gulp.dest('./dist'));
});

gulp.task('default', () => {
    runSequence('merge', 'prefix', 'min');
});
