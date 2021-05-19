import mongoose, { Model, Schema } from "mongoose";
import { IEmployee } from "./model";

const EmployeeSchema: Schema = new Schema({
  name: { type: String, trim: true, required: true },
  birth_date: { type: Date, requred: true },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ["Male", "Female", "Other"],
      message:
        "{VALUE} is not allowed, only Male, Female and Other are Allowed",
    },
  },
  salary: {
    type: Number,
    required: true,
    min: [0, "Salary can't be less than zero!"],
  },
});

export const EmployeeModel: Model<IEmployee> = mongoose.model(
  "Employee",
  EmployeeSchema
);

export default EmployeeModel;
