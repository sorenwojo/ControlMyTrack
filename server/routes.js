var appRouter = function(app, turnoutHandler) {
    var _turnoutHandler = turnoutHandler;
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    
    app.get("/turnouts/status", function(req, res) {
        var status = _turnoutHandler.getStatus();
        res.send(status);
    }) 
}
 
module.exports = appRouter;