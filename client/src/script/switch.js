var SwitchFactory = (function(){
    var exports = {};
    
    var Switch = function(switchId) {
        this.switchId = switchId;
        this.isSwitching = false;
        this.isStraight = true;
        this.element = SVG.get(switchId + '-1');
        var self = this;
        $("#" + switchId).click(function() {
            if(!self.isSwitching) {
                self.isSwitching = true;
                setMovingClass(self.element);
                self.element.animate().attr('y1', 30);
            }        
        });
    };
    
    Switch.prototype.updateStatus = function (status){
        var self = this;
        var relevantStatuses = status.split(";").filter(function(item) { return item.indexOf(self.switchId) == 0; });
        
        if(relevantStatuses.length) {
            var parts = relevantStatuses[0].split(":");
            if(parts.length > 1) {
                setMovingClass(self.element);
                var actualStatus = parseInt(parts[1]);
                var targetY = actualStatus === 1 ? 50 : 10;
                this.element.animate().attr('y1', targetY).after(function(){
                    setStaticClass(self.element);
                    self.isSwitching = false;
                    self.isStraight = actualStatus === 0;
                });
            }
        }        
    };
    
    var setMovingClass = function(element) {
        element.removeClass('staticArm');
        element.addClass('movingArm');
    };

    var setStaticClass = function(element) {
        element.removeClass('movingArm');
        element.addClass('staticArm');
    };
    
    var create = function(switchId){
        return new Switch(switchId);
    };
    
    exports.create = create;    
    return exports;
})();