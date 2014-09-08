/* jshint node: true, strict: true */
/* global describe: true, it: true, before: true */

"use strict";

var mocha           = require('mocha'),
    assert          = require('chai').assert,
    jsdom           = require('jsdom'),
    dom           	= require('../');




describe('foo', function(){

    describe('bar', function(){

        it('xyz', function(done){
            var result = '<section id="root"></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elements    = [];

                utils.appendMultipleChildElements(root, elements);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

});