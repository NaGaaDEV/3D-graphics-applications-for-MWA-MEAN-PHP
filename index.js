require("dotenv").config();
require("./api/data/db");
const routes = require("./api/router")

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.use("/api", routes);

const logServerRunningPort = function(server) {
    console.log(process.env.MSG_SERVER_PORT, server.address().port);
}
const server = app.listen(process.env.PORT, () => logServerRunningPort(server));