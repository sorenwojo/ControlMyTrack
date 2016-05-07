var settings = require("./settings");
var keypress = require('keypress');
var turnoutHandler = require('./turnoutHandler');
var server = require('./server');
keypress(process.stdin);

turnoutHandler.initialize(settings);
server.createServer(turnoutHandler);


process.stdin.on('keypress', function (ch, key) {
  if (key && key.name == 's') {
    turnouts[0].toggleSwitch();
    console.log("toggled");
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
