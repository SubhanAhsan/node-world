// app/models/offer.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OfferSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Offer', OfferSchema);