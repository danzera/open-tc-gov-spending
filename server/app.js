var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// ROUTE INCLUDES
var index = require('./routes/index.js');
var pool = require('./modules/database.js');
pool.connect(function(err, database, done) {
  if (err) { // connection error
    console.log('error connecting to the database:', err);
  } else { // we connected
    console.log('successful connection to the db');
    database.query('SELECT * FROM "agency";',
      function(queryErr, result) { // query callback
        done();
        if (queryErr) {
          console.log('error making query:', queryErr);
          // res.sendStatus(500);
        } else {
          console.log('query successful', result);
          // res.send(appointmentTypesArray);
        }
    }); // end query callback
  } // end DB connection if-else
}); // end pool.connect

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// ROUTES
app.use('/*', index);

// SET PORT
app.set('port', (process.env.PORT || 5000));

// LISTEN
app.listen(app.get('port'), function(){
   console.log('Listening on port', app.get('port'));
});
