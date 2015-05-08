var express        = require('express')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')

  , organisations = require('./routes/organisations')
  , probes = require('./routes/probes')
  , metrics = require('./routes/metrics')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}


/*********
 ENDPOINTS
 *********/

app.get('/hci/organisations', organisations.findAll)
app.get('/hci/organisations/:id', organisations.find)
app.post('/hci/organisations', organisations.create)
app.put('/hci/organisations/:id', organisations.update)
app.del('/hci/organisations/:id', organisations.destroy)

app.get('/hci/probes', probes.findAll)
app.get('/hci/probes/:id', probes.find)
app.post('/hci/probes', probes.create)
app.put('/hci/probes/:id', probes.update)
app.del('/hci/probes/:id', probes.destroy)

app.get('/hci/metricCalculator', metrics.findAll)
app.get('/hci/metricCalculator/:id', metrics.find)
app.post('/hci/metricCalculator', metrics.create)
app.put('/hci/metricCalculator/:id', metrics.update)
app.del('/hci/metricCalculator/:id', metrics.destroy)


var forceSync = true;

db.sequelize.sync({force: forceSync}).then(function () {
    var port = app.get('port');
    http.createServer(app).listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
});
