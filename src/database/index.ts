import mongoose from "mongoose";
import Logger from "../core/Logger";
import { db, environment } from "../config";


// Build the connection string
const dbURI: string = environment === "dev" ? db.devUrl : db.prodUrl;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

// Create the database connection
mongoose
    .connect(dbURI, options)
    .then(() => {
        Logger.info("Mongoose connection done");
    })
    .catch((e) => {
        Logger.info("Mongoose connection error");
        Logger.error(e);
    });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
    Logger.info("Mongoose default connection open to " + dbURI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
    Logger.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
    Logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        Logger.info(
            "Mongoose default connection disconnected through app termination"
        );
        process.exit(0);
    });
});
