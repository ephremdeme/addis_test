import app from "./config/app";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 5001;

app.use(errorHandler()); //I applied it last, cause i want it to run last and handle all the unhandled errors.

app.listen(PORT, () => {
  console.log(" Express server listening on " + PORT);
});

process.on("beforeExit", () => {
  mongoose.disconnect(() => console.log("Close Mongoose Connection"));
});
