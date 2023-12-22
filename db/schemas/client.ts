import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../../types.ts";
import { validatorsClient } from "../validators/valClient.ts";
import { cardPreSave, clientPostDelete } from "../middlewares/midClient.ts";

export type ClientModelType =
  & mongoose.Document
  & Omit<Client, "id" | "travels">
  & { travels: [mongoose.Types.ObjectId] };

const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cards: {
      type: [
        {
          number: { type: Number, required: true },
          cvv: { type: Number, required: true },
          expirity: { type: String, required: true },
          money: { type: Number, required: true },
        },
      ],
      default: [],
    },
    travels: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Travel",
        },
      ],
      default: [],
    },
  },
);

export const ClientModel = mongoose.model<ClientModelType>(
  "Client",
  ClientSchema,
);

// Validate name format (only letters and spaces) and length (2-30)
ClientSchema.path("name").validate(
  validatorsClient.nameFormat,
  "Name must be between 2 and 30 characters",
);

// Validate if card exists in ClientModel
ClientSchema.path("email").validate(
  validatorsClient.emailExists,
  "Email already registered",
);

// Validate email format (email@domain)
ClientSchema.path("email").validate(
  validatorsClient.emailFormat,
  "Email format is invalid, please use this format email@domain",
);

// Middleware for validate a card before save
ClientSchema.pre("save", cardPreSave);

// Middleware for delete all travels of a client before delete
ClientSchema.post("findOneAndDelete", clientPostDelete);