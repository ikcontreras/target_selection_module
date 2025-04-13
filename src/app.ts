import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { log } from "@utils";
import { routes } from "./routes";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const format =
  process.env.LOG_FORMAT ||
  "[HTTP][INFO] [:date[iso]] :method :url :status - :response-time ms";

const port = process.env.PORT || 8888;

app.use(express.json());

app.use(morgan(format));

routes.forEach((route) => {
  app[route.method](route.path, route.controller);
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  log.error(
    `${req.ip} ${req.method} ${req.originalUrl} 500 Internal Server Error: ${err.message}`,
  );
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.use(function (req, res) {
  log.error(`${req.ip} ${req.method} ${req.originalUrl} 404 Not Found`);
  res.status(404);
  res.send({ error: "Not found" });
});

app.listen(port, async () => {
  log.info("Initializing YVH target selection module...");
  log.info("Loading target prioritization algorithm...");
  log.info("Initializing communication protocol...");
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/yvh-target-selection-module",
    );
    log.info(
      "Connection established with the Advanced Defense Droid Data Base. (MongoDB)",
    );
  } catch (err) {
    log.error(
      "Error connecting with the Advanced Defense Droid Data Base. (MongoDB)",
    );
  }

  log.info("Integration with audit system completed.");
  log.info("YVH tactical system ready to identify and eliminate threats.");
  log.info(`YVH target selection module is live on port ${port}.`);
});
