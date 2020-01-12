var path = require('path');

let { PythonShell } = require('python-shell');

const { promisify } = require('util');

var pyPath = path.join(__dirname, '../../analytics/py/read_powerpoint.py');
var presPath = path.join(__dirname, '../../../assets/test/py-pres-test.pptx');

console.log(pyPath, presPath);

var py_options = { pythonPath: 'python3', args: [presPath] };

var PythonServer = function() {
  var _me = this;

  //////////////////////////////////////////////////////////////commands
  this.init = function() {
    console.log('pyserver: (init)');
  };

  this.run = async function() {
    const pythonPromise = promisify(PythonShell.run);
    const result = await pythonPromise(pyPath, py_options);
    return result;
  };
};

module.exports = PythonServer;

/*
	this.run = function () {

		//let pyshell = new PythonShell(pyPath, py_options);
	//	console.log(pyshell)
		let res="";

		PythonShell.run(pyPath, py_options, function (err, results) {
		////	console.log('res', results)
		//	console.log(err)
			res=results;
			console.log('ok')
			//return results;
		});
		console.log('ok1',res)
	};
	*/

//PythonShell.run(pyPath, options, function (err, results) {
//	console.log('res',results)
//	console.log(err)
//	console.log('ok')
//});
/*
let pyshell = new PythonShell(pyPath, options);

pyshell.on('message', function (message) {
	console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
	if (err) {
		throw err;
	};
	console.log('finished');
});
*/
