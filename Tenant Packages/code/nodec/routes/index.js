var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());

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
router.get('/tcgetDiagram', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});






    router.post('/tcgetDiagram',function (req,res,next){

        var txtcode = req.body.txtcode;
        var fs = require('fs');
        var filename="tenantc.seq";
        fs.writeFile( __dirname+"/java/tenantc.seq",txtcode, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");

        });


        if (txtcode.length == 0)
        {
            res.render('index', {filename:pngname,visibility:'visible',errmsg:"Please Enter valid code."});
            //uploadedfilename="";
            filename="";
        }
        else
        {
            var fnwe = filename.substring(0, filename.lastIndexOf('.'));
            var pngname = fnwe + ".png";
            var jar = __dirname+"/java/sequence-10.0.jar";
            var fpath = __dirname+"/java/"+filename;
            console.log(jar);
            console.log(fpath);
            exec('java -Dzanthan.prefs=diagram.preferences -jar '+jar+ ' --headless '+fpath,
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                    res.render('index', {filename:"/java/"+pngname,visibility:'visible',errmsg:"Diagram:"});
                    //uploadedfilename="";
                    filename="";

                });
        }





        });


module.exports = router;
