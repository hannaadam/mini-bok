var express = require('express');
var app = express();
// BodyParser reads and format the data from the post request.
var bodyParser = require('body-parser');
var fs = require('fs');
var pathData = __dirname + '/data/data.json'
var data;

fs.readFile(pathData, 'utf8', function (err, text) {
  if (err) throw err; 
  data = JSON.parse(text);
})
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
// TODO Return a confimation that the data is stored.
// TODO Clear the form
app.post('/skapabok', function (req, res) {
  var newBook = {
    title: req.body.title,
    author: req.body.author.split(', '),
    year: req.body.year,
    genre: req.body.genre.split(', '),
    format: req.body.format.split(', '),
    publisher: req.body.publisher,
    info: req.body.info
  } 
  console.log(newBook);
  data.books.push(newBook);
  console.log(data);
  fs.writeFile(pathData, JSON.stringify(data, null, 4), function (err) {
    if (err) throw err;
    res.render(__dirname + '/views/skapabok')
    console.log('Book was added', data);
  })
})

app.listen(3000);

