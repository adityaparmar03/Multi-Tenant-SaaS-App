var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());
var mysql = require('mysql');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var exec = require('exec');
var uploadedfilename="";
//var datetime = new Date();
var pngname="";





router.get('/', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"",datacnf:"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});
router.get('/tdgetDiagram', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"" ,datacnf:""});
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});
router.get('/tdgetScore', function(req, res, next) {
    res.render('index', { filename: '',visibility:'hidden',errmsg:"",datacnf:"" });
    //res.sendFile(path.join(__dirname, 'views/index.html'));
});






    router.post('/tdgetDiagram',function (req,res,next){

        var txtcode = req.body.txtcode;
        var fs = require('fs');
        var filename="tenantd.png";
        fs.writeFile( __dirname+"/java/tenantd.png",txtcode, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");

        });


        if (txtcode.length == 0)
        {
            res.render('index', {filename:"",visibility:'hidden',errmsg:"Please Enter valid code.",datacnf:""});
            //uploadedfilename="";
            filename="";
        }
        else
        {
            var fnwe = filename.substring(0, filename.lastIndexOf('.'));
            var pngname = fnwe + ".png";
            var jar = __dirname+"/java/sequence-10.0.jar";
            var fpath = __dirname+"/java/"+fnwe;
            console.log(jar);
            console.log(fpath);
            exec('umlgraph '+fpath+' png',
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                    res.render('index', {filename:"/java/"+pngname,visibility:'visible',errmsg:"Diagram:",datacnf:""});
                    //uploadedfilename="";
                    filename="";

                });
        }





        });

router.post('/tdgetScore',function (req,res,next) {

    var score =( req.body.score).toString();
    console.log(score);
    var haserr = 0;


    var connection = mysql.createConnection({

       host : 'graderabcd.crcfwhhjhczu.us-west-2.rds.amazonaws.com',
       user : 'root',
       password : 'rootroot',
       database : 'grader'

    });
    if (score.length == 0)
    {
        res.render('index', {filename:"/java/"+pngname,visibility:'visible',errmsg:"Diagram:",datacnf:"Please Enter your comments."});


    }
    else
    {
        connection.connect(function (error) {
            if (!error)
            {
                console.log("successfull connection");
                connection.query("INSERT INTO `grader`.`Tenant_Data` (`tablename`, `column1`) VALUES ('TD','"+score+"');",function (error) {
                    if (error)
                    {
                        console.log("Data not inserted"+error);
                        haserr = 0;
                    }
                    else
                    {
                        console.log("Data Successfully inserted ");
                        haserr = 1 ;

                    }

                });

            }
            else
            {
                console.log("Not Connected");
                haserr = 0;
            }

        })
        if(haserr)
        {
            res.render('index', {filename:"/java/"+pngname,visibility:'visible',errmsg:"Diagram:",datacnf:"something went wrong !!"});

        }
        else
        {
            res.render('index', {filename:"/java/"+pngname,visibility:'visible',errmsg:"Diagram:",datacnf:"Tenant is graded successfully."});

        }
    }


});


module.exports = router;
