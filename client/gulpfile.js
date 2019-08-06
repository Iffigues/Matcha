'use strcit';

//dependencies

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

// SCSS|CSS

var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

// Compile SCSS
gulp.task('compile_scss', function(){

    gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(rename({ suffix : '.min' }))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

// Detect change in SCSS
gulp.task('watch_scss', function() {
    gulp.watch(SCSS_SRC, ['compile-scss']);
});

// Run tasks
    gulp.task('default', ['watch_scss']);