/* jshint node: true, strict: true */

"use strict";

var gulp        = require('gulp'),
    dom         = require('../../');



/** 
  * Helper for walking down a DOM tree and call a callback on each node. 
  * Shamelessly copied from https://gist.github.com/958000
  */

function walk(node, callback) {
    var depth = 0,
        skip, 
        tmp;

    do {
        if (!skip) {
            skip = callback.call(node, depth) === false;
        }

        if (!skip && (tmp = node.firstChild)) {
            depth++;

        } else if ((tmp = node.nextSibling)) {
            skip = false;

        } else {
            tmp = node.parentNode;
            depth--;
            skip = true;
        }

        node = tmp;

    } while (depth > 0);
}



/** 
  * Helper for removing all child elements of a DOM node
  */

function removeChildren(node) {
    if (node.hasChildNodes()) {
        while (node.childNodes.length >= 1) {
            node.removeChild(node.firstChild);
        }
    }
}



/**
  * Gulp task for safe removal of whitespace
  *
  * Walk the documents DOM and clone _only_ element nodes and text nodes which does not contain
  * just whitespace into a new document fragment. This will result in a document fragment which
  * does not contain any whitespace between elements nodes.
  */

gulp.task('strip-whitespace', function() {
    return gulp.src('./src/example.html')
        .pipe(dom(function(){

            var minified = this.createDocumentFragment();

            walk(this.documentElement, function(depth){

                // Clone only #element nodes and #text nodes which is not only whitespace

                if ((this.nodeType === 1) || (this.nodeType === 3 && this.nodeValue.replace(/\s/g, '').length)) {
                    var clone   = this.cloneNode(false),
                        child   = minified,
                        i       = 0;

                    for (i = 0; i < depth; i += 1) {
                        child = child.lastChild;
                    }

                    child.appendChild(clone);
                }

                return true;
            });
            
            removeChildren(this.documentElement);
            this.appendChild(minified);

            return this;

        }))
        .pipe(gulp.dest('./build'));
});



// Default task

gulp.task('default', ['strip-whitespace']);
