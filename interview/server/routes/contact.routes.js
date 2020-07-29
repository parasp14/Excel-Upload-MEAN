var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var session = require('express-session');
var request = require ('request');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(session({ resave: false ,secret: '123456' , saveUninitialized: true,cookie: { maxAge: 60000 }}));
var Contact = require('../models/Contacts');


router.get('/', function (req, res) {
    Contact.find({}, function (err, contacts) {
        if(err){
            return res.status(200).send({'err':err});
        }
        return res.status(200).send({'contacts':contacts});
      }); 
});
 
router.post('/', function (req, res) {
    contacts_data = req.body;
    Contact.insertMany(contacts_data).then(function(){ 
        return res.status(200).send({"msg":"Data inserted"})  // Success 
    }).catch(function(error){ 
        return res.status(200).send({'err':error});     // Failure 
    });
});

module.exports = router;