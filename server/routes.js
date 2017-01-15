var appRouter = function(app, turnoutHandler) {
    var _turnoutHandler = turnoutHandler;
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    
    app.get("/turnouts", function(req, res) {
        var status = _turnoutHandler.getStatus();
        res.send(status);
    }) 

    app.post("/turnouts/:id(\\d+)/toggle", function(req, res) {
        console.log("Recieved request to toggle %d.", req.params.id);
        _turnoutHandler.toggle(req.params.id);
        res.end();
    }) 

    app.post("/turnouts/:id(\\d+)/manual/cancel", function(req, res) {
        console.log("Recieved request to cancel manual position of %d", req.params.id);
        _turnoutHandler.cancelManual(req.params.id);
        res.end();
    }) 

    app.post("/turnouts/:id(\\d+)/manual/setmin", function(req, res) {
        console.log("Recieved request to set current position as min for %d", req.params.id);
        _turnoutHandler.setCurrentPositionAsMin(req.params.id);
        res.end();
    }) 

    app.post("/turnouts/:id(\\d+)/manual/setmax", function(req, res) {
        console.log("Recieved request to set current position as max for %d", req.params.id);
        _turnoutHandler.setCurrentPositionAsMax(req.params.id);
        res.end();
    }) 

    app.post("/turnouts/:id(\\d+)/manual/:position(\\d+)", function(req, res) {
        console.log("Recieved request to manual position %d at value %d.", req.params.id, req.params.position);
        _turnoutHandler.setPosition(req.params.id, req.params.position);
        res.end();
    }) 
}
 
module.exports = appRouter;