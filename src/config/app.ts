import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRouter from "../routes/employee";

class App {
  public app: Application;
  public mongoUrl: string;

  constructor() {
    dotenv.config();

    this.app = express();
    this.mongoUrl =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URL
        : process.env.LOCAL_MONGO_URL;

    this.config();
    this.app.use("/api/employees", employeeRouter);
    this.errorRoute();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());

    this.mongoSetup();
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));
    mongoose.set("debug", true);
  }

  private errorRoute(): void {
    this.app.all("*", function (req: Request, res: Response) {
      res.status(404).send({
        success: false,
        err: {
          message: "Check your URL or Method please!",
        },
      });
    });
  }
}

export default new App().app;
