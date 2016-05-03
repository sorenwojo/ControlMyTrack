const low = require('lowdb');
const storage = require('lowdb/file-async');
const db = low('db.json', { storage });

const ObjectName = 'turnouts'

module.exports = {
    getSettingsForTurnout(name) {
        var result = db(ObjectName).find({name: name});
        return {minPosition: result.minPosition, maxPosition: result.maxPosition };
    },
    
    updateSettingsForTurnout(name, minPosition, maxPosition) {
        var settings = {name, minPosition, maxPosition};
        db(ObjectName).chain().find({name: name}).assign({minPosition: minPosition, maxPosition: maxPosition}).value();
    },
    
    getSettingsForAllTurnouts() {
        return db(ObjectName).value();        
    }
}
