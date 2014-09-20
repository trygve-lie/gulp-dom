/* jshint node: true, strict: true */
/* global describe: true, it: true, before: true */

"use strict";

var mocha           = require('mocha'),
    assert          = require('chai').assert,
    jsdom           = require('jsdom'),
    dom           	= require('../');



describe('gulp-dom()', function(){

    describe('error handling', function(){

        it('should pass file when it isNull()', function(done) {
            var stream      = dom(),
                mockFile    = {
                isNull: function() { 
                    return true; 
                }
            };

            stream.on('data', function(data) {
                assert.equal(data, mockFile);
                done();
            });

            stream.write(mockFile);
        });

        it('should emit error when file isStream()', function (done) {
            var stream      = dom(),
                mockFile    = {
                    isNull: function () { 
                        return false; 
                    },
                    isStream: function () { 
                        return true; 
                    }
                };
            
            stream.on('error', function (err) {
                assert.equal(err.message, 'Streaming not supported');
                done();
            });
        
            stream.write(mockFile);
        });

    });

});