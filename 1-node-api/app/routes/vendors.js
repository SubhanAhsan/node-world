//app/routes/vendors

var express     = require('express');
var router      = express.Router();

//models
var Vendor      = require('../models/vendor');

// on routes that end in /vendors
// -----------------------------------------------
router.route('/vendors')

    //create a vendor (accessede at POST https://localhost:8080/api/vendors)
    .post(function(req, res){

        var vendor      = new Vendor();          //create a new instance of the Vendor model
        vendor.name     = req.body.name         //set the vendor name
        vendor.logo_url = req.body.logo_url     //set vendor logo url

        //save the vendor and check for errors
        vendor.save(function(err){
            if(err)
                res.send(err);  //TODO proper error handling/message

            res.json({message: 'Vendor created!'});
        });


    })  //.post

    //get all the vendors (accessed at GET http://localhost:8080/api/vendors)
    .get(function(req, res){
        
        Vendor.find(function(err, vendors){
            if(err)                             //TODO error handling
                res.send(err);

            res.json(vendors);
        });
    }); //.get


// on routes that end in /vendors/:vendor_id
// ------------------------------------------------
router.route('/vendors/:vendor_id')

    //get the vendor with that id (accessd at GET http://localhost:8080/vendors/:vendor_id)
    .get(function(req, res){
       Vendor.findById(req.params.vendor_id, function(err, vendor){
            if(err)
                res.send(err);                      //TODO error handling
            
            res.json(vendor);
       });
    })

    //update the vendor with this id (accessed at PUT http://localhost:8080/vendors/:vendor_id)
    .put(function(req, res){
        Vendor.findById(req.params.vendor_id, function(err, vendor){
            if(err)
                res.send(err);                       //TODO error handling
                                   
            //update the vendor info
            vendor.name         = req.body.name;
            vendor.logo_url     = req.body.logo_url;
            //vendor.active       = req.body.active;

            //save the vendor
            vendor.save(function(err){
                if(err)
                    res.send(err);                  //TODO error handling
                
                res.json({ message: 'Vendor updated!'});        //TODO proper response
            }); //.vendor.save

        }); //.Vendor.findById
    }) //.put

    //delete the vendor with this id (accessed at DELETE http://localhost:8080/api/vendors/:vendor_id)
    .delete(function(req, res){
        Vendor.remove( { 
                _id: req.params.vendor_id
            }, function(err, vendor){
                    if(err)
                        res.send(err);                      //TODO error handling
                    
                    res.json({ message: 'Vendor successfully deleted!'});

        }); //.Vendor.remove

    }); //.delete



module.exports = router;