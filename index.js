/************************************
 *             config               *
 ************************************/
// environment vars
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

// PostgreSQL config
// (!) Warning : this works only with package pg v7, not the latest pg v8
const dbHandler = require('./dbHandler');
const { Client } = require('pg');
const db = new Client({
  connectionString: DATABASE_URL,
  ssl: true,
});
db.connect();


/*************************************************
 *  Express config :
 *     - static folder in /client
 *     - json body parsing
 *     - urlencoded body parsing
 *     - middleware logging received requests
 *************************************************/
const express = require('express');
const app = express();
app
  .use(express.static(__dirname + '/client/build'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(function (req, res, next) {
    // during development, we can allow CORS between back-end :5000 and front-end :3000
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log(req.method + ' ' + req.url);
    next();
  });

/************************************
 *             routing              *
 ************************************/
/* Front page */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

/*************************************************************************
 * REST API allowing:                                                    *
 *     - POST   -> insertInto                                            *
 *     - GET    -> selectAll                                             *
 *     - PUT    -> update                                                *
 *     - DELETE -> delete                                                *
 *                                                                       *
 * Base is /api/ and any beer can be accessed with /api/beers/beer_id    *
 *************************************************************************/
app.get('/api/:table', (req, res) => {
  dbHandler
    .selectAll(db, req.params.table)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/api/:table/:id', (req, res) => {
  dbHandler
    .selectAllWhere(db, req.params.table, req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.post('/api/:table', (req, res) => {
  dbHandler
    .insertInto(db, req.params.table, req.body)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end('Database error: ' + err);
    });
});

app.put('/api/:table/:id', (req, res) => {
  dbHandler
    .update(db, req.params.table, req.params.id, req.body)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end('Database error: ' + err);
    });
});

app.delete('/api/:table/:id', (req, res) => {
  dbHandler
    .delete(db, req.params.table, req.params.id)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end('Database error: ' + err);
    });
});

// 404 Error : this route must remain on bottom and no dynamic route must be defined before
app.use(function (req, res) {
  res.status(404).send('404: Page not found');
});

// 500 Error : this route must remain on bottom and no dynamic route must be defined before
app.use(function (error, req, res, next) {
  res.status(500).send('500: Internal server error');
});

module.exports = app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
