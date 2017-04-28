var express = require('express');
var router = express.Router();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('exec');
var uploadedfilename="";
//var datetime = new Date();


router.use(express.static(path.join(__dirname, 'public')));



router.get('/', function(req, res, next) {
    res.render('index', {'error':"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});





router.post('/submit', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;
    if(username=="admin" && password=="admin")
    {
        var tenant = req.body.tenant;
        if(tenant == "ta") {

           res.redirect('http://lb-2015201511.us-west-2.elb.amazonaws.com/ta');
        }
        else if(tenant == "tb") {

            res.redirect('http://lb-2015201511.us-west-2.elb.amazonaws.com/tb');
        }
        else if(tenant == "tc"){

            res.redirect('http://lb-2015201511.us-west-2.elb.amazonaws.com/tc');

        }else if(tenant == "td")
        {
            res.redirect('http://lb-2015201511.us-west-2.elb.amazonaws.com/td');
        }else{
            res.render('index', {'error':'Please Select Tenant.' });
        }

    }
    else
    {
        res.render('index', {'error':'Combination of Username & Password are wrong !' });
    }


});

module.exports = router;
