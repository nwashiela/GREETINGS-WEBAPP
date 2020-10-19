const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const Greetings = require('./greetings');
const pg = require("pg");
const Pool = pg.Pool;
const Routes = require('./routes')

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



// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg1212@localhost:5432/users';

const pool = new Pool({
  connectionString
})
const greetings = Greetings(pool);
const namesRoutes = Routes(greetings);

app.use(express.static('public'))


app.get('/', namesRoutes.dRouts)

app.post('/', namesRoutes.flshMessage)

app.get('/greeted', namesRoutes.gettingTheList)

app.get('/counter/:name',namesRoutes.greetedMessage)

app.get('/delete', namesRoutes.buttonRst)

const PORT = process.env.PORT || 2020;

app.listen(PORT, async function () {
  console.log('App starting on port', PORT);
});