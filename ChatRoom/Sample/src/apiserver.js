const config = require('../config.json');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/apiconfig', (req, res) => {
    res.send(JSON.stringify(config.wsSetting));
})

var server = app.listen(config.apiSetting.apiPort, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})