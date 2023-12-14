import mongoose from "npm:mongoose@7.6.3";
import { Status, Travel } from "../../types.ts";

export type TravelModelType =
  & mongoose.Document
  & Omit<Travel, "id" | "client" | "driver">
  & { client: mongoose.Types.ObjectId }
  & { driver: mongoose.Types.ObjectId };

const Schema = mongoose.Schema;

const TravelSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    money: { type: Number, min: 5, required: true },
    distance: { type: Number, min: 0.01, required: true },
    date: { type: String, required: true },
    status: { type: Status, enum: Status, required: false, default: "IN_PROGRESS" },
  },
);

export const TravelModel = mongoose.model<TravelModelType>(
  "Travel",
  TravelSchema,
);
