//app/routes/offers

var express     = require('express');
var router      = express.Router();

//models
var Offer       = require('../models/offer');

// on routes that end in /offers
// ----------------------------------------------------
router.route('/offers')

    // create an offer (accessed at POST http://localhost:8080/api/offers)
    .post(function(req, res) {
        
        var offer = new Offer();      // create a new instance of the Offer model
        offer.name = req.body.name;  // set the offer name (comes from the request)

        // save the offer and check for errors
        offer.save(function(err) {
            if (err)                //TODO - proper error message/handling
                res.send(err);

            res.json({ message: 'Offer created!' }); //TOD proper response like return the offer json
        });

    })

 // get all the offers (accessed at GET http://localhost:8080/api/offers)
    .get(function(req, res) {
        Offer.find(function(err, offers) {
            if (err)                //TODO error handling
                res.send(err);

            res.json(offers);
        });
    });


// on routes that end in /offers/:offer_id
// ----------------------------------------------------
router.route('/offers/:offer_id')

    // get the offer with that id (accessed at GET http://localhost:8080/api/offers/:offer_id)
    .get(function(req, res) {
        Offer.findById(req.params.offer_id, function(err, offer) {
            if (err)
                res.send(err);
            res.json(offer);
        });
    })

    // update the offer with this id (accessed at PUT http://localhost:8080/api/offers/:offer_id)
    .put(function(req, res) {

        // use our Offer model to find the offer we want
        Offer.findById(req.params.offer_id, function(err, offer) {

            if (err)
                res.send(err);

            offer.name = req.body.name;  // update the offers info

            // save the offer
            offer.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Offer updated!' });
            });

        });
    })

    // delete the offer with this id (accessed at DELETE http://localhost:8080/api/offers/:offer_id)
    .delete(function(req, res) {
        Offer.remove({
            _id: req.params.offer_id
        }, function(err, offer) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;