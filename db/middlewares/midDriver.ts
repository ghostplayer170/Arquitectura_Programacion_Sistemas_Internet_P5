import { DriverModelType } from "../schemas/driver.ts";
import { GraphQLError } from "graphql";
import { TravelModel } from "../schemas/travel.ts";

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

export const driverPreDelete = function (
  this: DriverModelType,
  next: () => void,
) {
  try {
    this.travels.forEach(async (travelID) => {
      const travel = await TravelModel.findById(travelID).exec();
      if (!travel) {
        throw new GraphQLError(`Error: Travel ${travelID} does not exist`);
      }
      if (travel.status === "IN_PROGRESS") {
        throw new GraphQLError(
          `Error: Driver ${this._id} has a travel in progress`,
        );
      }
    });
    next();
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};
