import { Document } from "mongoose";

export interface IEmployee extends Document {
  name: String;
  birth_date: Date;
  gender: GenderEnum;
  salary: String;
}

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}
