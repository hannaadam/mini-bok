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


// Get the index on the root route
app.get('/', function (req, res) {
  res.render(__dirname + '/views/index', {books: data.books})
})


// /skapabok will make 
app.get('/skapabok', function (req, res) {
  res.render(__dirname + '/views/skapabok')
})


// On post we get the data from the user
app.post('/skapatbok', function (req, res) {
  var newBook = {
    title: req.body.title,
    author: req.body.author.split(', '),
    year: req.body.year,
    genre: req.body.genre.split(', '),
    format: req.body.format.split(', '),
    publisher: req.body.publisher,
    language: req.body.language.split(', '),
    info: req.body.info,
    id: data.books.length
  } 
  console.log(newBook);
  data.books.push(newBook);
  console.log(data);
  fs.writeFile(pathData, JSON.stringify(data, null, 4), function (err) {
    if (err) throw err;
    res.render(__dirname + '/views/skapatbok')
    console.log('Book was added', data);
  })
})

// Dynamic routes that shows the book the user clicked. 
app.get('/book/:id', function (req, res) {
  res.render(__dirname + '/views/boksida', {book: data.books[req.params.id]})
})

app.listen(3000);
