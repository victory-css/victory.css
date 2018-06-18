'use strict';

const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const injectString = require('gulp-inject-string');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const buildDate = (new Date).getUTCFullYear();
const packageData = JSON.parse(fs.readFileSync('./package.json'));

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

gulp.task('default', [ 'merge', 'prefix', 'min' ]);
