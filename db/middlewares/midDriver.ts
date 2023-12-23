import { DriverModelType } from "../schemas/driver.ts";
import { GraphQLError } from "graphql";
import { TravelModel } from "../schemas/travel.ts";

// Middleware for delete all travels references of a driver after delete
export const driverPostDelete = async function (this: DriverModelType) {
  try {
    await TravelModel.updateMany(
      { _id: { $in: this.travels } },
      { driver: null },
    );
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};
