import { Card } from "../../types.ts";
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
      // Validate if driver has a travel in progress
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
      // Validate if client has a card with enough money
      if (client.cards.length === 0) {
        throw new GraphQLError(`Error: Client ${this.client} has no cards`);
      }
      if (client.cards.some((card: Card) => card.money < this.money)) {
        throw new GraphQLError(
          `Error: Client ${this.client} has no card with enough money`,
        );
      }
      // Validate if client has a travel in progress
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

// Middleware for update driver and client travels after save
export const travelPostSave = async function (this: TravelModelType) {
  try {
    // Add travel to driver 
    const driverUpdated = await DriverModel.updateOne(
      { _id: this.driver },
      { $push: { travels: this._id } },
    );
    if (!driverUpdated) {
      throw new GraphQLError(`Error: Driver ${this.driver} does not exist`);
    }
    // Add travel to client and update card money
    const clientUpdated = await ClientModel.updateOne(
      { _id: this.client },
      { $push: { travels: this._id } },
    );
    const client = await ClientModel.findById(this.client).exec();
    if (client) {
      const card = client.cards.find((card: Card) => card.money >= this.money);
      if (card) {
        card.money -= this.money;
        await client.save();
      }
    }
    if (!clientUpdated) {
      throw new GraphQLError(`Error: Client ${this.client} does not exist`);
    }
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

// Middleware for update driver and client travels after update
export const travelPostUpdate = async function (this: TravelModelType) {
  try {
    // Delete travel if driver or client is null
    if (this.driver === null && this.client === null) {
      await TravelModel.findByIdAndDelete(this._id);
    }
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};
