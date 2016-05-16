

const TURNOUT_POSITION_STRAIGHT = 0;
const TURNOUT_POSITION_DIVERGE = 1;
const TURNOUT_POSITION_MOVING_TO_STRAIGHT = 10;
const TURNOUT_POSITION_MOVING_TO_DIVERGE = 11;

module.exports = Turnout;

function Turnout(name) {
    this._name = name;
    this._position = TURNOUT_POSITION_STRAIGHT;
    
    this._minPosition = 10;
    this._maxPosition = 15;
    this._actualPosition = this._minPosition;
    this._updateServo();
};

Turnout.prototype.intervalPassed = function() {
    switch(this._position){
        case TURNOUT_POSITION_MOVING_TO_DIVERGE:
            this._actualPosition++;
            if(this._actualPosition === this._maxPosition) {
                this._position = TURNOUT_POSITION_DIVERGE;
            }
            this._updateServo();
            break;
        case TURNOUT_POSITION_MOVING_TO_STRAIGHT:
            this._actualPosition--;
            if(this._actualPosition === this._minPosition) {
                this._position = TURNOUT_POSITION_STRAIGHT;
            }
            this._updateServo();
            break;
    }
};

Turnout.prototype.getActualPosition = function () {
    return {name: this._name, position: this._position};
};

Turnout.prototype.toggleSwitch = function () {
    switch(this._position) {
        case TURNOUT_POSITION_DIVERGE:
        case TURNOUT_POSITION_MOVING_TO_DIVERGE:
            this._position = TURNOUT_POSITION_MOVING_TO_STRAIGHT;
            break;
        case TURNOUT_POSITION_STRAIGHT:
        case TURNOUT_POSITION_MOVING_TO_STRAIGHT:
            this._position = TURNOUT_POSITION_MOVING_TO_DIVERGE;
            break;
    }    
};

Turnout.prototype.getStatus = function() {
    return { name: this._name, position: this._position };    
};

Turnout.prototype._updateServo = function () {
    console.info("Name:%s Position:%d", this._name, this._actualPosition);
};