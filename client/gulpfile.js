"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', ['serve']);

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

var htmlWatcher = gulp.watch('./*.html', browserSync.reload);
htmlWatcher.on('change', logRefresh);

var jsWatcher = gulp.watch('./*.js', browserSync.reload);
jsWatcher.on('change', logRefresh);

function logRefresh(event){
    console.log('File "' + event.path + '" changed. Reloading...')
}