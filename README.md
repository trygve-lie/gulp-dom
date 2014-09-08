# gulp-dom

Gulp plugin for general DOM manipulation.

This [Gulp](http://gulpjs.com/) plugin is a simple wrapper around 
[jsdom](https://github.com/tmpvar/jsdom) making it possible to run DOM 
operations on any inbound HTML.



## Installation

```bash
$ npm install gulp-dom
````



## Basic example

Example on adding a `data` attribute with a version number on the `body` tag of 
a HTML document:

```js
var gulp = require('gulp'),
    dom  = require('gulp-dom');

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(dom(function(){
            this.querySelectorAll('body')[0].setAttribute('data-version', '1.0');
            return this;
        }))
        .pipe(gulp.dest('./public/'));
});
```



## Usage

The plugin has only one method which takes two attributes:


### mutator

The first attribute is required and is a mutator function. This is where you put
the code which you want to run and manipulate the HTML.

The plugin will take the provided HTML and parse it into a DOM document. The DOM 
document is then set as `this` on the mutator function.

A value must be returned by the mutator function and it is this returned value 
which will be passed on to the next step in the gulp chain.

Example mutator function:

```js
dom(function(){
	// 'this' holds the DOM and we can something on it
	this.getElementById('foo').setAttribute('class', 'bar');

	// return the DOM so it can be passed on to the next gulp step
	return this;
});
```

By default it is expected that the mutator function returns a DOM document, but 
any `String` value can be returned.


### serialize




## Tests

```bash
$ npm test
````

Tests are written in [mocha](http://visionmedia.github.io/mocha/).