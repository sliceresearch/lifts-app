
let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

//let PythonShell  = require('python-shell');
var createError = require('createerror');

let {PythonShell} = require('python-shell')


// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   server: { 
	socketOptions: { 
	  keepAlive: 300000, connectTimeoutMS: 30000 
	} 
  }, 
  replset: { 
	socketOptions: { 
	  keepAlive: 300000, 
	  connectTimeoutMS : 30000 
	} 
  } 
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

//var appPath = path.join(__dirname, '../../../www/index.html')
//var appPath = 'www/index.html';
//console.log('app path:' + appPath)

app.use(cors()); 

//app.use(express.static(path.join(__dirname, "www")));
app.use(express.static('www'));

//app.use(express.static(path.join(__dirname, 'dist/liftsapp')));
//app.get('/', (req, res) =>  res.sendFile(path.resolve(appPath)));
//app.use('/', express.static(appPath));

app.use('/api', presentationRoute)



// Create port
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
 
// Find 404 and hand over to error handler
app.use((req, res, next) => {
	next(console.log("404"));
  // next(createError({ name: '404', message: '404 error' }));
});

 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

//python

var pythonServerPath = path.join(__dirname, '/modules/pythonServer.js')
console.log('pyserver:' + pythonServerPath)
var PythonServer = require(pythonServerPath);
global.pyServer = new PythonServer();
global.pyServer.init();


//global.pyServer.run()