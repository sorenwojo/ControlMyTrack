var appRouter = function(app, turnoutHandler) {
    var _turnoutHandler = turnoutHandler;
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    
    app.get("/turnouts", function(req, res) {
        var status = _turnoutHandler.getStatus();
        res.send(status);
    }) 

    app.post("/turnouts/:id", function(req, res) {
        console.log("Recieved request to toggle %d.", req.params.id);
        _turnoutHandler.toggle(req.params.id);
        res.end();
    }) 
}
 
module.exports = appRouter;