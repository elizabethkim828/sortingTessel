// Running on your computer.

var express = require('express');
var http = require('http');
var fs = require('fs');
var server = http.createServer();
var app = express();

server.on('request', app);

server.listen(3001, function () {
 console.log('Server on.');
});

app.post('/upload-pic', function (req, res, next) {

    console.log('Request received');

    var imageData = new Buffer(0);

    req.on('data', function (chunk) {
        imageData = Buffer.concat([imageData, chunk]);
    });

    req.on('end', function () {
       // Full image ready.
        fs.writeFile('./'+ Date.now().toString() + '.jpg', imageData);
    });

});

// var tessel = require('tessel');
// var camera = require('camera-usb').use(tessel.port['A']);

// var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

// // cameralib.find(function(camera) {
// //   // stream some video when sound is sensed
// //   cameralib.on('ready', function(){
// //     var req = http.request({
// //       hostname: 'example.com',
// //         path: '/upload',
// //         method: 'POST'
// //       },
// //       function (res) {
// //         res.pipe(process.stdout)
// //       });
// //     camera.captureStream(2000, 'mjpg').pipe(req);
// //   });
// // });

// // Wait for the camera module to say it's ready
// camera.on('ready', function() {
//   notificationLED.high();
//   // Take the picture
//   camera.takePicture(function(err, image) {
//     if (err) {
//       console.log('error taking image', err);
//     } else {
//       notificationLED.low();
//       // Name the image
//       var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
//       // Save the image
//       console.log('Picture saving as', name, '...');
//       process.sendfile(name, image);
//       console.log('done.');
//       // Turn the camera off to end the script
//       camera.disable();
//     }
//   });
// });

// camera.on('error', function(err) {
//   console.error(err);
// });