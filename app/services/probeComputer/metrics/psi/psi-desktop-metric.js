var psi = require('psi');

var name = "psi-desktop";


var calculate = function (url, proxy, callback) {

    var score = null;

    var options = {strategy: "desktop"};

    if (proxy != null) {
        process.env.HTTPS_PROXY = proxy;
    }
// get the PageSpeed Insights report
    psi(url, options, function (err, data) {
        console.log(err);
        callback(data.score, JSON.stringify(data.pageStats));
    });

// output a formatted report to the terminal
    //psi.output(url,options,function (err) {
    //    console.log('done');
    //});
    return score;
};

module.exports.calculate = calculate;

module.exports.name = name;

//calculate('http://www.hirslanden.ch/global/en/home.html',null,function(a,b){
//    console.log("Score:" + a);
//    console.log("Output:" + b);
//});
