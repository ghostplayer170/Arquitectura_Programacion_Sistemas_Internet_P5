import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../db/schemas/travel.ts";

const addTravel = async (
  _: unknown,
  args: {
    client: string;
    driver: string;
    money: number;
    distance: number;
    date: string;
    status: string;
  },
): Promise<TravelModelType> => {
  try {
    const Travel = new TravelModel({
      client: args.client,
      driver: args.driver,
      money: args.money,
      distance: args.distance,
      date: args.date,
      status: args.status,
    });
    const createdTravel = await Travel.save();
    return createdTravel;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default addTravel;
