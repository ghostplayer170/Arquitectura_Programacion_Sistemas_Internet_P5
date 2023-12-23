import mongoose from "npm:mongoose@7.6.3";
import { Status, Travel } from "../../types.ts";
import { validatorsTravel } from "../validators/valTravel.ts";
import { travelPostSave, travelPostUpdate, travelPreSave } from "../middlewares/midTravel.ts";

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
    status: { type: String, enum: Status, required: false, default: Status.IN_PROGRESS },
  },
);

// Validate if clientID exists in ClientModel
TravelSchema.path("client").validate(
  validatorsTravel.clientIDExists,
  "Client ID does not exist",
);  

// Validate if driverID exists in DriverModel
TravelSchema.path("driver").validate(
  validatorsTravel.driverIDExists,
  "Driver ID does not exist",
);

// Validate money, must be greater or equal than 5
TravelSchema.path("money").validate(
  validatorsTravel.moneyMin,
  "Money must be greater or equal than 5",
);

// Validate distance, must be greater or equal than 0.01
TravelSchema.path("distance").validate(
  validatorsTravel.distanceMin,
  "Distance must be greater or equal than 0.01km",
);

// Validate date format is DD-MM-YYYY
TravelSchema.path("date").validate(
  validatorsTravel.dateFormat,
  "Date format must be DD-MM-YYYY",
);

// Validate date is greater or equal than current date
TravelSchema.path("date").validate(
  validatorsTravel.dateValid,
  "Date must be greater or equal than current date",
);

// Validate status is Status enum value
TravelSchema.path("status").validate(
  validatorsTravel.statusValid,
  "Status must be IN_PROGRESS or FINISHED",
);

// Middleware for validate a travel before save
TravelSchema.pre("save", travelPreSave);

// Middleware for save travel ID in client and driver
TravelSchema.post("save", travelPostSave);

// Middleware for delete travel ID in client and driver
TravelSchema.post("findOneAndUpdate", travelPostUpdate);

export const TravelModel = mongoose.model<TravelModelType>(
  "Travel",
  TravelSchema,
);