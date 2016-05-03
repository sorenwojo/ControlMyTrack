var Turnout = require("./turnout");
var Settings = require("./settings");
var keypress = require('keypress');
var express = require("express");
var bodyParser = require("body-parser");
keypress(process.stdin);
var app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes")(app);
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

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