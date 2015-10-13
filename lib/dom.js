/* jshint node: true, strict: true */

"use strict";


var jsdom           = require("jsdom"),
    utils           = require("gulp-util"),
    PluginError     = utils.PluginError,
    through2        = require("through2"),
    pluginName      = "gulp-dom";



module.exports = function (mutator) {
    var stream = through2.obj(function(file, enc, callback) {

    if (file.isNull()) {
        return callback(null, file);
    }

    if (file.isStream()) {
        return stream.emit("error", new PluginError(pluginName, "Streaming not supported"));
    }

    if (file.isBuffer()) {

        jsdom.env({
            html: file.contents.toString("utf8"),
            done: function (errors, window) {
                    if (errors) {
                        return stream.emit("error", new PluginError(pluginName, "Error parsing document: " + file.path));
                    }

                    var mutated = mutator.call(window.document);

                    file.contents = new Buffer(typeof mutated === 'string' ? mutated : jsdom.serializeDocument(mutated));
                    callback(null, file);

                    window.close();
                }
            });

        }

    });

    return stream;
};
