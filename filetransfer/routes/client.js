var querystring = require('querystring');
var http = require('http');

var data = querystring.stringify({
    username: "yourUsernameValue",
    password: "yourPasswordValue"
});

var options = {
    host: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: " + chunk);
    });
});

req.write(data);
req.end();