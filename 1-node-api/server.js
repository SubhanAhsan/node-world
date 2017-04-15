// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//connected to MongoDB Atlast hosted free db
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:bombay@cluster0-shard-00-00-inw4q.mongodb.net:27017,cluster0-shard-00-01-inw4q.mongodb.net:27017,cluster0-shard-00-02-inw4q.mongodb.net:27017/nodedb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'); // connect to our database

//models
var Offer     = require('./app/models/offer');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request to API made...');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /offers
// ----------------------------------------------------
router.route('/offers')

    // create an offer (accessed at POST http://localhost:8080/api/offers)
    .post(function(req, res) {
        
        var offer = new Offer();      // create a new instance of the Offer model
        offer.name = req.body.name;  // set the offer name (comes from the request)

        // save the offer and check for errors
        offer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Offer created!' });
    })

    })

 // get all the offers (accessed at GET http://localhost:8080/api/offers)
    .get(function(req, res) {
        Offer.find(function(err, offers) {
            if (err)
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
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);