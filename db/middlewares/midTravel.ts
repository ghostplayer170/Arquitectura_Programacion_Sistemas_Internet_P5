import { ClientModel } from "../schemas/client.ts";
import { DriverModel } from "../schemas/driver.ts";
import { TravelModel, TravelModelType } from "../schemas/travel.ts";
import { GraphQLError } from "graphql";

export const travelPreSave = async function (
  this: TravelModelType,
  next: () => void,
) {
  try {
    const driver = await DriverModel.findById(this.driver).exec();
    const client = await ClientModel.findById(this.client).exec();
    if(client?.cards === undefined){
       throw new GraphQLError(`Error: Client ${this.client} has no cards`);
    }
    if (client?.cards.some((card) => card.money > this.money)) {
      throw new GraphQLError(
        `Error: Client ${this.client} has no card with enough money`,
      );
    }
    if (client?.travels.length !== undefined && client?.travels.length > 0) {
      const lastTravelID = client?.travels[client?.travels.length - 1];
      const lastTravel = await TravelModel.findById(lastTravelID).exec();
      if (lastTravel?.status === "IN_PROGRESS") {
        throw new GraphQLError(
          `Error: Client ${this.client} has a travel in progress`,
        );
      }
    }
    if (driver?.travels.length !== undefined && driver?.travels.length > 0) {
      const lastTravelID = driver?.travels[driver?.travels.length - 1];
      const lastTravel = await TravelModel.findById(lastTravelID).exec();
      if (lastTravel?.status === "IN_PROGRESS") {
        throw new GraphQLError(
          `Error: Driver ${this.driver} has a travel in progress`,
        );
      }
    }
    next();
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export const travelPostSave = async function (this: TravelModelType) {
  try {
    await DriverModel.updateOne(
      { _id: this.driver },
      { $push: { travels: this._id } },
    );
    await ClientModel.updateOne(
      { _id: this.client },
      { $push: { travels: this._id } },
    );
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
}

export const travelPostUpdate = async function (this: TravelModelType) {
    try {
        if (this.driver === null && this.client === null) {
            await TravelModel.findOneAndDelete({ _id: this._id });
        }
    } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
    }
}