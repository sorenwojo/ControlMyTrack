var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    
    app.get("/turnouts/status", function(req, res) {
        res.send("Hej");
    }) 
}
 
module.exports = appRouter;