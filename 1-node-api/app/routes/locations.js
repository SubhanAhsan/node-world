//app/routes/locations

var express     = require('express');
var router      = express.Router();

//models
var Location      = require('../models/location');

// on routes that end in /locations
// -----------------------------------------------
router.route('/locations')

    //create a location (accessede at POST https://localhost:8080/api/locations)
    .post(function(req, res){

        var location      = new Location();          //create a new instance of the Location model
        location.name     = req.body.name         //set the location name
       
        //save the location and check for errors
        location.save(function(err){
            if(err)
                res.send(err);  //TODO proper error handling/message

            res.json({message: 'Location created!'});
        });


    })  //.post

    //get all the locations (accessed at GET http://localhost:8080/api/locations)
    .get(function(req, res){
        
        Location.find(function(err, locations){
            if(err)                             //TODO error handling
                res.send(err);

            res.json(locations);
        });
    }); //.get


// on routes that end in /locations/:vendor_id
// ------------------------------------------------
router.route('/locations/:vendor_id')

    //get the location with that id (accessd at GET http://localhost:8080/locations/:vendor_id)
    .get(function(req, res){
       Location.findById(req.params.vendor_id, function(err, location){
            if(err)
                res.send(err);                      //TODO error handling
            
            res.json(location);
       });
    })

    //update the location with this id (accessed at PUT http://localhost:8080/locations/:vendor_id)
    .put(function(req, res){
        Location.findById(req.params.vendor_id, function(err, location){
            if(err)
                res.send(err);                       //TODO error handling
                                   
            //update the location info
            location.name         = req.body.name;           
            //location.active       = req.body.active;

            //save the location
            location.save(function(err){
                if(err)
                    res.send(err);                  //TODO error handling
                
                res.json({ message: 'Location updated!'});        //TODO proper response
            }); //.location.save

        }); //.Location.findById
    }) //.put

    //delete the location with this id (accessed at DELETE http://localhost:8080/api/locations/:vendor_id)
    .delete(function(req, res){
        Location.remove( { 
                _id: req.params.vendor_id
            }, function(err, location){
                    if(err)
                        res.send(err);                      //TODO error handling
                    
                    res.json({ message: 'Location successfully deleted!'});

        }); //.Location.remove

    }); //.delete



module.exports = router;