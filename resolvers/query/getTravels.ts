import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../db/schemas/travel.ts";

const Travels = async (): Promise<TravelModelType[]> => {
  try {
    const Travels = await TravelModel.find().exec();
    if (!Travels) {
      throw new GraphQLError(`No Travels found`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return Travels;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default Travels;