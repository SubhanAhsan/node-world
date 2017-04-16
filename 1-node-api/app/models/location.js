//app/models/location.js

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var LocationSchema  = new Schema({
    name : {
        type: String                //TODO put validation for max length, mandatory, duplicates
    },
    active: {
        type: Boolean,              //active status - true / false
        default: true
    }

});

module.exports = mongoose.model('Location', LocationSchema);