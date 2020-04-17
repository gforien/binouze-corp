/************************************
 *             config               *
 ************************************/
// environment vars
const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const DATABASE_URL = process.env.DATABASE_URL;

// Express
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

// PostgreSQL
const dbHandler = require('./dbHandler');
// const { Client } = require('pg');
// const db = new Client({
//   connectionString: DATABASE_URL,
//   ssl: true
// });
// db.connect();


/************************************
 *             routing              *
 ************************************/
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.get('/api/beers', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});



// 404 Error : this route must remain on bottom and no dynamic route must be defined before
app.use(function (req, res) {
  res.status(404).send('404: Page not found');
});

// 500 Error : this route must remain on bottom and no dynamic route must be defined before
app.use(function (error, req, res, next) {
  res.status(500).send('500: Internal server error');
});

// run
module.exports = app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});



// var express = require('express');
// var request = require('request');
// /*var cookieParser = require('cookie-parser'); // login is kept via a cookie
// var querystring = require('querystring');
// var bodyParser = require('body-parser');
// var exphbr = require('express-handlebars');
// */






// // Initiate server, static folder is /public, load cookieParser, connect to db
// var app = express();
// app
//   .use(express.static(__dirname + '/public'))
//   // .use(cookieParser())
//   .use(bodyParser.json())
//   .use(bodyParser.urlencoded({ extended: false }));

// // Sets our app to use the handlebars engine
// var handlebars = exphbr.create({
//   defaultLayout: '_TEMPLATE',
//   extname: '.html',
//   layoutsDir: __dirname + '/public'
// });
// app.engine('html', handlebars.engine);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/public');


// /*****************************************************
//  *                routes definitions
//  ******************************************************/
// app.get('/spotify', function (req, res) {
//   res.render('spotify', { name: 'spotify' });
// });

// app.get('/game', function (req, res) {
//   res.status(200).sendFile(__dirname + '/public/game.html');
// });

// request.post(authOptions, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var access_token = body.access_token;
//     res.send({
//       access_token: access_token
//     });
//   }
// });

// /****************************************************
//  *             callbacks and JSON-feeding
//  *****************************************************/
// app.get('/:type/:name', function (req, res) {
//   console.log('GET /' + req.params.type + '/' + req.params.name);

//   switch (req.params.type) {
//     case 'database':
//       dbHandler.selectAll(db, req.params.name, data => {
//         res.end(JSON.stringify(data));
//       });
//       break;

//     // Here we just load a file with fs and send it
//     case 'mp3':
//       let filename = __dirname + '/' + req.params.type + '/' + req.params.name;

//       fs.stat(filename, (err, stat) => {
//         if (!err) {
//           // OSU file : we parse it with osuParser.js before sending
//           if (req.params.type == 'osu') {
//             let textByLine = fs
//               .readFileSync(filename)
//               .toString('utf-8')
//               .split('\n');
//             res.status(200).end(osuParser.parser(textByLine));

//             // PNG file : just send it
//           } else if (req.params.type == 'artwork') {
//             res.status(200).sendFile(filename);

//             // MP3 file : load the binary and send it in base64
//           } else if (req.params.type == 'mp3') {
//             fs.readFile(filename, function (err, file) {
//               let base64File = Buffer.from(file, 'binary').toString('base64');
//               res.json({ fileContent: base64File });
//             });
//           }
//         } else {
//           console.log('Error: file not found ' + filename);
//           res.status(404).end('File not found !');
//         }
//       });
//       break;

//     default:
//       res.status(404).send('404: Page not found');
//   }
// });

// app.put('/database/:name/:primary_key', function (req, res) {
//   console.log(
//     'PUT update /database/' +
//       req.params.name +
//       '/' +
//       req.params.primary_key +
//       ' with value ' +
//       req.body['0']
//   );
//   dbHandler.update(
//     db,
//     req.params.name,
//     req.params.primary_key,
//     req.body['0'],
//     function (data) {
//       res.status(200).end(JSON.stringify(data));
//     }
//   );

// });

// /*app.delete('/database/:name/:primary_key', function(req, res) {
//   dbHandler.selectAll(db, req.params.name, function(data) {
//       res.end(JSON.stringify(data));
//   });
//   //db.close();
// });*/