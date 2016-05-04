var Turnout = require("./turnout");
var Settings = require("./settings");
var keypress = require('keypress');
var turnoutHandler = require('./turnoutHandler');
var server = require('./server');
keypress(process.stdin);

server.createServer(turnoutHandler);

var settingsForTurnouts = Settings.getSettingsForAllTurnouts();
var turnouts = settingsForTurnouts.map(function(item){
  return new Turnout(item.name);
});

setInterval(timerTrig, 500);
console.log("Count:", turnouts.length);
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

function timerTrig() {
    turnouts.forEach(function(element) {
        element.intervalPassed();
    }, this);    
}