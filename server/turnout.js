

const TURNOUT_STATE_STRAIGHT = 0;
const TURNOUT_STATE_DIVERGE = 1;
const TURNOUT_STATE_MOVING_TO_STRAIGHT = 10;
const TURNOUT_STATE_MOVING_TO_DIVERGE = 11;
const TURNOUT_STATE_MANUAL_CONTROL = 99;

module.exports = Turnout;

function Turnout(settings, id, name, minPosition, maxPosition) {
    this._settings = settings;
    this.id = id;
    this._name = name;
    this._state = TURNOUT_STATE_STRAIGHT;

    this._minPosition = minPosition;
    this._maxPosition = maxPosition;
    this._position = this._minPosition;
    this._updateServo();
};

Turnout.prototype.intervalPassed = function () {
    switch (this._state) {
        case TURNOUT_STATE_MOVING_TO_DIVERGE:
            this._position++;
            if (this._position === this._maxPosition) {
                this._state = TURNOUT_STATE_DIVERGE;
            }
            this._updateServo();
            break;
        case TURNOUT_STATE_MOVING_TO_STRAIGHT:
            this._position--;
            if (this._position === this._minPosition) {
                this._state = TURNOUT_STATE_STRAIGHT;
            }
            this._updateServo();
            break;
    }
};

Turnout.prototype.getActualPosition = function () {
    return { name: this._name, position: this._state };
};

Turnout.prototype.togglePosition = function () {
    console.log("Toggling position of turnout %d", this.id);
    switch (this._state) {
        case TURNOUT_STATE_DIVERGE:
        case TURNOUT_STATE_MOVING_TO_DIVERGE:
            this._state = TURNOUT_STATE_MOVING_TO_STRAIGHT;
            break;
        case TURNOUT_STATE_STRAIGHT:
        case TURNOUT_STATE_MOVING_TO_STRAIGHT:
            this._state = TURNOUT_STATE_MOVING_TO_DIVERGE;
            break;
    }
};

Turnout.prototype.setPosition = function(position) {
    this._state = TURNOUT_STATE_MANUAL_CONTROL;
    this._position = position;
    this._updateServo();
}

Turnout.prototype.setCurrentPositionAsMin = function() {
    this._state = TURNOUT_STATE_STRAIGHT;
    this._minPosition = this._position;
    this._settings.updateSettingsForTurnout(this._name, this._minPosition, this._maxPosition);
}

Turnout.prototype.setCurrentPositionAsMax = function() {
    this._state = TURNOUT_STATE_DIVERGE;
    this._maxPosition = this._position;
    this._settings.updateSettingsForTurnout(this._name, this._minPosition, this._maxPosition);
}

Turnout.prototype.cancelManual = function() {
    if(Math.abs(this._position - this._minPosition) < Math.abs(this._position - this._maxPosition))
    {
        this._state = TURNOUT_STATE_STRAIGHT;
        this._position = this._minPosition;
    }
    else
    {
        this._state = TURNOUT_STATE_DIVERGE;
        this._position = this._maxPosition;
    }
    this._updateServo();
}

Turnout.prototype.getStatus = function () {
    return { name: this._name, position: this._position, state: this._state };
};

Turnout.prototype._updateServo = function () {
    console.info("Id:%d Name:%s Position:%d", this.id, this._name, this._position);
};