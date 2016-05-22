var Turnout = require("./turnout");
var turnouts;

module.exports.initialize = function (settings) {
    var settingsForTurnouts = settings.getSettingsForAllTurnouts();
    turnouts = settingsForTurnouts.map(function (item) {
        return new Turnout(item.name);
    });

    console.log("Found and initialized %d turnouts", turnouts.length);

    setInterval(timerTrig, 500);
};

function timerTrig() {
    turnouts.forEach(function (element) {
        element.intervalPassed();
    }, this);
}

module.exports.getStatus = function () {
    return turnouts.map(function (turnout) {
        return turnout.getStatus();
    });
};