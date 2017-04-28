var express = require('express');
var router = express.Router();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('exec');
var uploadedfilename="";
//var datetime = new Date();






router.get('/', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});
router.get('/getDiagram', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});






    router.post('/getDiagram',function (req,res,next){

        var filename = "uploadedfilename";

        if(filename=="")
        {
            // res.send(500,'showAlert')
           // res.redirect(index.ejs);

            res.render('index', {filename:"",visibility:'hidden',errmsg:"Please upload file."});

        }
        else {

            var fnwe = filename.substring(0, filename.lastIndexOf('.'));
            var pngname = fnwe + ".png";

            exec('java -Dzanthan.prefs=diagram.preferences -jar java/sequence-10.0.jar --headless java/example.seq',
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                    res.render('index', {filename:'a.png',visibility:'visible',errmsg:"Diagram:"});
                    uploadedfilename="";
                    filename="";

                });

        }

        });


module.exports = router;
