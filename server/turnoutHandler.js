var Turnout = require("./turnout");
var turnouts;

module.exports.initialize = function (settings) {
    var settingsForTurnouts = settings.getSettingsForAllTurnouts();
    turnouts = settingsForTurnouts.map(function (item) {
        return new Turnout(item.id, item.name, item.minPosition, item.maxPosition);
    });

    console.log("Found and initialized %d turnouts", turnouts.length);

    setInterval(timerTrig, 500);
};

function timerTrig() {
    turnouts.forEach(function (element) {
        element.intervalPassed();
    }, this);
}

function findAndCall(id, action) {
    turnouts.forEach(function(turnout){
        if(turnout.id == id){
            action(turnout);
        }
    });
}

module.exports.getStatus = function () {
    return turnouts.map(function (turnout) {
        return turnout.getStatus();
    });
};
    
module.exports.toggle = function (id) {
    var i = parseInt(id);
    if(isNaN(i)) {
        return;
    }
    findAndCall(i, function(turnout){
        turnout.togglePosition();
    });
};

module.exports.setPosition = function (id, position) {
    var i = parseInt(id);
    var pos = parseInt(position);
    if(isNaN(i) || isNaN(pos)) {
        return;
    }

    findAndCall(i, function(turnout) {
        turnout.setPosition(pos);
    });
};

module.exports.setCurrentPositionAsMin = function (id) {
    var i = parseInt(id);
    if(isNaN(i)) {
        return;
    }
    findAndCall(i, function(turnout){
        turnout.setCurrentPositionAsMin();
    });
};

module.exports.setCurrentPositionAsMax = function (id) {
    var i = parseInt(id);
    if(isNaN(i)) {
        return;
    }
    findAndCall(i, function(turnout){
        turnout.setCurrentPositionAsMax();
    });
};

module.exports.cancelManual = function (id) {
    var i = parseInt(id);
    if(isNaN(i)) {
        return;
    }
    findAndCall(i, function(turnout){
        turnout.cancelManual();
    });
};
