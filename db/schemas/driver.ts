import mongoose from "npm:mongoose@7.6.3";
import { Driver } from "../../types.ts";
import { validatorsDriver } from "../validators/valDriver.ts";
import { driverPostDelete } from "../middlewares/midDriver.ts";

export type DriverModelType =
  & mongoose.Document
  & Omit<Driver, "id" | "travels">
  & { travels: [mongoose.Types.ObjectId] };

const Schema = mongoose.Schema;

const DriverSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    travels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Travel",
      },
    ],
  },
);

export const DriverModel = mongoose.model<DriverModelType>(
  "Driver",
  DriverSchema,
);

// Validate name format (only letters and spaces) and length (2-30)
DriverSchema.path("name").validate(
  validatorsDriver.nameFormat,
  "Name must be between 2 and 30 characters",
);

// Validate if email exists in DriverModel
DriverSchema.path("email").validate(
  validatorsDriver.emailExists,
  "Email already registered",
);

// Validate email format (email@domain)
DriverSchema.path("email").validate(
  validatorsDriver.emailFormat,
  "Email format is invalid, please use this format email@domain",
);

// Vadlidate if username exists in DriverModel
DriverSchema.path("username").validate(
  validatorsDriver.usernameExists,
  "Username already registered",
);

// Middleware for delete all travels of a driver before delete
DriverSchema.post("findOneAndDelete", driverPostDelete);