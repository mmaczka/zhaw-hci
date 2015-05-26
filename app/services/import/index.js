var parseXlsx = require('excel');


parseXlsx('Spreadsheet.xlsx', function (err, data) {
    if (err) throw err;
    // data is an array of arrays
});
