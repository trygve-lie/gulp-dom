/* jshint node: true, strict: true */

"use strict";

var gulp     = require('gulp'),
    dom      = require('../../');

// Gulp task which will make external links target _blank

gulp.task('external-links-target-blank', function() {
  return gulp.src('src/example.html')
    .pipe(dom(function() {
      var links = this.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
          if (links[i].getAttribute('href').match(/^https?:\/\//)) {
                links[i].setAttribute('target', '_blank');
          }                                                                                              
      }
      return this;
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['external-links-target-blank']);
