var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server;
 
function startListening(turnoutHandler) {
    var routesS = routes(app, turnoutHandler);
    server = app.listen(3000, function () {
        console.log("Listening on port %s...", server.address().port);
    });        
}

module.exports.createServer = function(turnoutHandler) {
    startListening(turnoutHandler);
};