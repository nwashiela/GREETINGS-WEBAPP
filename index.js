const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const Greetings = require('./greetings');
const pg = require("pg");
const Pool = pg.Pool;

const greetings = Greetings();
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/users';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  })

app.use(express.static('public'))


app.get('/', async function (req, res) {
  res.render('index')

})

app.post('/', async function (req, res) {
  const enterName = req.body.name
  const languages = req.body.language

  if(!languages){
    req.flash('info', 'Select Language')
    res.render('index')
    return
  }

  if (!enterName) {
    req.flash('info', 'Enter Your Name Please')
    res.render('index')
    return

  }

  // greetings.setName(enterName)
  res.render("index", {
    message: await greetings.code(enterName, languages),
    counter:await greetings.counter()
  })

})

app.get('/greeted', async function (req, res) {
  //     //  var names = 
  // // console.log(names)
  res.render('greeted', {
    list:await greetings.getNames()
  })


})

app.get('/counter/:name', async function (req, res) {
  const actions = req.params.name
  const counter = greetings.getCounter(actions)

  res.render('message', {
    message:await greetings.getMessage(actions, counter)
  })

})

const PORT = process.env.PORT || 2020;

app.listen(PORT, async function () {
  console.log('App starting on port', PORT);
});