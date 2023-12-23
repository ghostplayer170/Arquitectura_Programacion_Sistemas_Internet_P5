import { Card, Status } from "../../types.ts";
import { ClientModel } from "../schemas/client.ts";
import { DriverModel } from "../schemas/driver.ts";
import { TravelModel, TravelModelType } from "../schemas/travel.ts";
import { GraphQLError } from "graphql";

export const travelPreSave = async function (
  this: TravelModelType,
  next: () => void,
) {
  try {
    if (this.driver !== null) {
      const driver = await DriverModel.findById(this.driver).exec();
      if (!driver) {
        throw new GraphQLError(`Error: Driver ${this.driver} does not exist`);
      }
      if (driver.travels.length > 0) {
        const lastTravelID = driver.travels[driver.travels.length - 1];
        const lastTravel = await TravelModel.findById(lastTravelID).exec();
        if (!lastTravel) {
          throw new GraphQLError(
            `Error: Driver ${this.driver} has a travel that does not exist`,
          );
        }
        if (lastTravel.status === "IN_PROGRESS") {
          throw new GraphQLError(
            `Error: Driver ${this.driver} has a travel in progress`,
          );
        }
      }
    }
    if (this.client !== null) {
      const client = await ClientModel.findById(this.client).exec();
      if (!client) {
        throw new GraphQLError(`Error: Client ${this.client} does not exist`);
      }
      if (client.cards.length === 0) {
        throw new GraphQLError(`Error: Client ${this.client} has no cards`);
      }
      if (client.cards.some((card: Card) => card.money < this.money)) {
        throw new GraphQLError(
          `Error: Client ${this.client} has no card with enough money`,
        );
      }
      if (client.travels.length > 0) {
        const lastTravelID = client.travels[client.travels.length - 1];
        const lastTravel = await TravelModel.findById(lastTravelID).exec();
        if (lastTravel?.status === "IN_PROGRESS") {
          throw new GraphQLError(
            `Error: Client ${this.client} has a travel in progress`,
          );
        }
      }
    }
    next();
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export const travelPostSave = async function (this: TravelModelType) {
  try {
    const driverUpdated = await DriverModel.updateOne(
      { _id: this.driver },
      { $push: { travels: this._id } },
    );
    if (!driverUpdated) {
      throw new GraphQLError(`Error: Driver ${this.driver} does not exist`);
    }
    const clientUpdated = await ClientModel.updateOne(
      { _id: this.client },
      { $push: { travels: this._id } },
    );
    if (!clientUpdated) {
      throw new GraphQLError(`Error: Client ${this.client} does not exist`);
    }
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export const travelPostUpdate = async function (this: TravelModelType) {
  try {
    if (this.driver === null && this.client === null) {
      await TravelModel.findByIdAndDelete(this._id);
    }
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};
