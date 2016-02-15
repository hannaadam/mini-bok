var express = require('express');
var app = express();
// BodyParser reads and format the data from the post request.
var bodyParser = require('body-parser');

// Urlencoded turns the querystring to readable data.
app.use(bodyParser.urlencoded({
  extended: true
}));
// bodyparser.json turns thata in too JSON data.
app.use(bodyParser.json());

// Use Jade as templating engine
app.set('view engine', 'jade');

// On root we send the index.jade
app.get('/', function (req, res) {
  res.render(__dirname + '/views/index')
})

// On post we get the data from the user
// TODO Store the data in data/data.json
// TODO Return a confimation that the data is stored.
// TODO Clear the form
app.post('/skapabok', function (req, res) {
  console.log(req.body)
})

app.listen(3000);
