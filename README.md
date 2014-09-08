# gulp-dom

Gulp plugin for general DOM manipulation.

This [Gulp](http://gulpjs.com/) plugin is a simple wrapper around 
[jsdom](https://github.com/tmpvar/jsdom) making it possible to run DOM 
operations on any inbound HTML.


## Installation

```bash
$ npm install gulp-dom
````


## Basic usage

Example on adding a `data` attribute with a verion number on the `body` tag of a
HTML document:

JS:
```js
var gulp = require('gulp'),
    dom  = require('gulp-dom');

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(dom(function(){
            this.document.querySelectorAll('body')[0].setAttribute('data-version', '1.0');;
            return this;
        }))
        .pipe(gulp.dest('./public/'));
});
```


## Tests

```bash
$ npm test
````

Tests are written in [mocha](http://visionmedia.github.io/mocha/).