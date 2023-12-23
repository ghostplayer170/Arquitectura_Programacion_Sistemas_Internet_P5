import { Card } from "../../types.ts";
import { ClientModelType } from "../schemas/client.ts";
import { GraphQLError } from "graphql";
import { validatorsClient } from "../validators/valClient.ts";
import { TravelModel } from "../schemas/travel.ts";

export const cardPreSave = async function (
  this: ClientModelType,
  next: () => void,
) {
  try {
    if (this.cards && this.cards.length !== 0) {
      const card: Card = this.cards[this.cards.length - 1];
      if (validatorsClient.cardNumberFormat(card.number)) {
        throw new GraphQLError(
          `Error: Card number ${card.number} is not valid. It must be a number with 16 digits`,
        );
      }
      if (await validatorsClient.cardExists(card.number)) {
        throw new GraphQLError(
          `Error: Card number ${card.number} already exists. It must be unique`,
        );
      }
      if (validatorsClient.cardExpirityFormat(card.expirity)) {
        throw new GraphQLError(
          `Error: Card expirity ${card.expirity} is not valid. It must be in format MM/YYYY`,
        );
      }
      if (validatorsClient.cardExpirityDate(card.expirity)) {
        throw new GraphQLError(
          `Error: Card expirity date ${card.expirity} is not valid. It must be greater or equal than current date`,
        );
      }
      if (validatorsClient.cardCvvFormat(card.cvv)) {
        throw new GraphQLError(
          `Error: Card cvv ${card.cvv} is not valid. It must be a number with 3 digits`,
        );
      }
      if (validatorsClient.cardMoneyFormat(card.money)) {
        throw new GraphQLError(
          `Error: Card money ${card.money} is not valid. It must be greater or equal than 0`,
        );
      }
    }
    next();
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export const clientPostDelete = async function (this: ClientModelType) {
  try {
    await TravelModel.updateMany(
      { _id: { $in: this.travels } },
      { client: null },
    );
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export const clientPreDelete = function (
  this: ClientModelType,
  next: () => void,
) {
  try {
    if (this.travels) {
      Promise.all(this.travels.map(async (travelID) => {
        const travel = await TravelModel.findById(travelID).exec();
        if (!travel) {
          throw new GraphQLError(`Error: Travel ${travelID} does not exist`);
        }
        if (travel.status === "IN_PROGRESS") {
          throw new GraphQLError(
            `Error: Client ${this._id} has a travel in progress`,
          );
        }
      }));
      next();
    } else {
      next();
    }
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};
