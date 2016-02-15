var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(__dirname + '/views/index')
})

app.post('/skapabok', function (req, res) {
  console.log(req.body)
})

app.listen(3000);
