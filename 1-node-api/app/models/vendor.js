// app/mnodels/vendor.js

var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var VendorSchema   = new Schema({
    name: {
        type: String        
    },
    logo_url: {
        type: String        //vendor company logo TODO - logic for url / file upload
    },
    active:{                //active status - true / false
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Vendor', VendorSchema);