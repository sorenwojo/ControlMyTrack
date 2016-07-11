

const TURNOUT_STATE_STRAIGHT = 0;
const TURNOUT_STATE_DIVERGE = 1;
const TURNOUT_STATE_MOVING_TO_STRAIGHT = 10;
const TURNOUT_STATE_MOVING_TO_DIVERGE = 11;

module.exports = Turnout;

function Turnout(id, name) {
    this.id = id;
    this._name = name;
    this._state = TURNOUT_STATE_STRAIGHT;

    this._minPosition = 10;
    this._maxPosition = 15;
    this._position = this._minPosition;
    this._updateServo();
};

Turnout.prototype.intervalPassed = function () {
    switch (this._state) {
        case TURNOUT_STATE_MOVING_TO_DIVERGE:
            this._position++;
            if (this._position === this._maxPosition) {
                this._position = TURNOUT_STATE_DIVERGE;
            }
            this._updateServo();
            break;
        case TURNOUT_STATE_MOVING_TO_STRAIGHT:
            this._position--;
            if (this._position === this._minPosition) {
                this._position = TURNOUT_STATE_STRAIGHT;
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
            this._position = TURNOUT_STATE_MOVING_TO_STRAIGHT;
            break;
        case TURNOUT_STATE_STRAIGHT:
        case TURNOUT_STATE_MOVING_TO_STRAIGHT:
            this._position = TURNOUT_STATE_MOVING_TO_DIVERGE;
            break;
    }
};

Turnout.prototype.getStatus = function () {
    return { name: this._name, position: this._state };
};

Turnout.prototype._updateServo = function () {
    console.info("Id:%d Name:%s Position:%d", this.id, this._name, this._position);
};