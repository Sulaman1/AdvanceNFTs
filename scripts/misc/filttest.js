var fs = require("fs");

// Asynchronous read
fs.readFile('./img/pug.png', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('./img/pug.png');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");