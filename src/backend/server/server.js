let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');


// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const presentationRoute = require('./routes/presentation.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

var appPath = path.join(__dirname, '../../../www/index.html')
var appPath = 'www/index.html';
console.log('app path:' + appPath)
app.use(cors()); 
//app.use(express.static(path.join(__dirname, 'dist/liftsapp')));
app.use('/', express.static(appPath));
app.use('/api', presentationRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
 
// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

//python

let pyshell = require('python-shell');

//let pyshell = new PythonShell("../analytics/py/read_powerpoint.py");
 
// sends a message to the Python script via stdin
//pyshell.send('hello');
 
//pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
//  console.log(message);
//});