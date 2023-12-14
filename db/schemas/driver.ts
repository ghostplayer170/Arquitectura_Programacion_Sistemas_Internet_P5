import mongoose from "npm:mongoose@7.6.3";
import { Driver } from "../../types.ts";

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
