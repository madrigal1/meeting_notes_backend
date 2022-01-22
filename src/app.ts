import Logger from "./core/Logger";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { corsUrl, environment } from "./config";
import { NotFoundError, ApiError, InternalError } from "./core/ApiError";
import routesV1 from "./routes/v1";
import morgan from "morgan";
import RequestLogger from "./core/RequestLogger";
import "./database"; // initialize database

process.on("uncaughtException", (e) => {
    Logger.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "10mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(morgan("tiny", { stream: RequestLogger }));
// Routes

app.get("/", (req, res) => {
    return res.send("Welcome to the meeting notes backend v.1.0");
})
app.use("/v1", routesV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (environment !== "prod") {
            Logger.error(err);
            return res.status(500).send(err.message);
        }
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
