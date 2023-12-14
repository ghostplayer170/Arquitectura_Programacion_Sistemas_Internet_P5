import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../../types.ts";

export type ClientModelType =
  & mongoose.Document
  & Omit<Client, "id" | "travels">
  & { travels: [mongoose.Types.ObjectId] };

const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cards: [
      {
        number: { type: Number, required: true },
        cvv: { type: Number, required: true },
        expirity: { type: String, required: true },
        money: { type: Number, required: true },
      },
    ],
    travels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Travel",
      },
    ],
  },
);

export const ClientModel = mongoose.model<ClientModelType>(
  "Client",
  ClientSchema,
);
