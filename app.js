var express = require('express');
var app = express();


app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(__dirname + '/views/index')
})

app.listen(3000);
