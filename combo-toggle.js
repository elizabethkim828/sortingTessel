var tessel = require('tessel');
var servolib = require('servo-pca9685');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']); 
var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1

var speed = 0.3;


var hash = function(str) {
  var hash = 5381,
      i    = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return hash >>> 0;
}

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {

    //read card ID
    var cardId = card.uid.toString('hex');
    console.log('UID:', cardId);
    
    
    //set random stop time
    var time = hash('chris');
    time = (time % 8 + 3) * 1000
    console.log(time)

    servo.configure(servo1, 0.05, 0.12, function () {

        servo.move(servo1, speed);

        setTimeout(function() {
          var toggle = false;
          setInterval(function() {
            if (toggle) {
              servo.move(servo1, 0);
            } else {
              servo.move(servo1, 1)
            }
            toggle = !toggle;            
          })
        }, 1000);

        setTimeout(function() {
          servo.stop();
        }, time)
    
    });
  });
});

rfid.on('error', function (err) {
  console.error(err);
});