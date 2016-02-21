var express = require('express');
var app = express();
// BodyParser reads and format the data from the post request.
var bodyParser = require('body-parser');

// Get the data and store it in memory.
var fs = require('fs');
var pathData = __dirname + '/data/data.json'
var data;

fs.readFile(pathData, 'utf8', function (err, text) {
  if (err) throw err; 
  data = JSON.parse(text);
});

// Serve static files CSS JS images.
app.use(express.static('public'));


// Urlencoded turns the querystring to data.
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

// When /skapabok is loaded first serve the login page
app.get('/skapabok', function (req, res){
  res.render(__dirname + '/views/login')
})

// Authenticate the passed in username and password. If there is a user serv the skapabok form.
app.post('/skapabok', function (req, res) {
  var checkedUser = data.users.filter(function (user){
    return user.username == req.body.username && req.body.password;
  })
  if (checkedUser.length == 1) {
    res.render(__dirname + '/views/skapabok')
  }
})


/*
 * Create a new book obj. 
 * Split the parts of the data that we might use in outher ways.
 * Add a uniqe ID. 
 * Push the new book in too the books obj as well as write to the database  
*/
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
    id: Date.now()
  } 
  data.books.push(newBook);
  fs.writeFile(pathData, JSON.stringify(data, null, 4), function (err) {
    if (err) throw err;
    res.render(__dirname + '/views/skapatbok')
    console.log('Book was added', data);
  })
})

// Dynamic routes that shows the book the user clicked. 
app.get('/book/:id', function (req, res) {
  console.log(data.books.find( (book) => book.id == req.params.id ));
  res.render(__dirname + '/views/boksida', {book: data.books.find( (book) => book.id == req.params.id) })
})

app.get('*', function (req, res) {
  res.render(__dirname + '/views/404')
})

app.listen(3000);
