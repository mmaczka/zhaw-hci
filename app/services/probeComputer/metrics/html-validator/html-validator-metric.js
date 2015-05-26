var w3cjs = require('w3cjs');


var name = "w3cjs";
var calculate = function (url, proxy, callback) {

    var results = w3cjs.validate({
        file: url, // file can either be a local file or a remote file
        //file: 'http://html5boilerplate.com/',
        //input: '<html>...</html>',
        //input: myBuffer,
        output: 'json', // Defaults to 'json', other option includes html
        //doctype: 'HTML5', // Defaults false for autodetect
        //charset: 'utf-8', // Defaults false for autodetect
        proxy: proxy, // Default to null
        callback: function (results) {
            var score = 0;
            if (results.messages != null) {
                score = results.messages.length;
            }
            callback(score, JSON.stringify(results));
            // depending on the output type, res will either be a json object or a html string
        }
    });
};


module.exports.calculate = calculate;
module.exports.name = name;
