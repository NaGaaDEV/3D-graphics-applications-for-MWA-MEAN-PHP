const mongoose = require("mongoose");
require("./app-model")

mongoose.connect(process.env.DB_URL);

const logDatabaseConnected = () => console.log(process.env.MSG_DATABASE_CONNECTED);
mongoose.connection.on("connected", () => logDatabaseConnected());

const logDatabaseDisconnected = () => console.log(process.env.MSG_DATABASE_DISCONNECTED);
mongoose.connection.on("disconnected", () => logDatabaseDisconnected());

const endApplication = function(message, exitCode) {
    console.log(message);
    process.exit(exitCode);
}
const closeDatabaseConnection = () => mongoose.connection.close(endApplication(process.env.MSG_APP_TERMINATED), 0);

process.on("SIGINT", () => closeDatabaseConnection());
process.on("SIGTERM", () => closeDatabaseConnection());