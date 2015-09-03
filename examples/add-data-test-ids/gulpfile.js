/* jshint node: true, strict: true */

"use strict";

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    dom         = require('../../');

// Concatinate js files into one file
gulp.task('concat-js-files', function() {
    return gulp.src(['./src/js/**/*'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./build/js/'));
});

// Gulp task for replacing references to existing script tags
// with reference to concatinated version

gulp.task('add-data-test-ids', function() {
    return gulp.src('./src/example.html')
        .pipe(dom(function(){

            var domElements = this.getElementsByTagName('*'),
            i = domElements.length;

        	// Remove references file scripts
        	while(i--) {

                var node = domElements[i];

                if( node.hasAttribute('ng-repeat')){
                    node.setAttribute('data-test-id', node.nodeName.toLowerCase() + '-repeat-{{$index}}');
                }else{
                    node.setAttribute('data-test-id', node.nodeName.toLowerCase()+ '-' + i);
                }

            }
            return this;
        }))
        .pipe(gulp.dest('./build'));
});



// Default task

gulp.task('default', ['concat-js-files', 'add-data-test-ids']);
