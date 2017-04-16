// app/models/offer.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OfferSchema   = new Schema({
    name: {
        type: String            // title - TODO put validation for max length
    },
    desc: {
        type: String            // description - TODO put validation for max length
    },
    offer_start:{               //offer start date - TODO put validation for current week or in not to distance future
        type: Date
    },
    offer_end: {
        type: Date              //offer end date4 - TODO put validation for more than start date and in not to distance future
    },
    vendor: {                   //vendor -- 
        vendorid:{
            type: Schema.Types.ObjectId,
            turnOn: false
        },
        name: {
            type: String        
        },
        logo: {
            type: String        //vendor company logo
        }          
    },
    location:{                  //TODO - location will be multivalue/array
        locationid:{
            type: Schema.Types.ObjectId,
            turnOn: false
        },
        name:{
            type: String
        }
    }

});

module.exports = mongoose.model('Offer', OfferSchema);