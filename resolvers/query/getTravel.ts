import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../db/schemas/travel.ts";

const getTravel = {
  Query: {
    getTravel: async (
      _: unknown,
      args: { id: string },
    ): Promise<TravelModelType> => {
      try {
        const Travel = await TravelModel.findById(args.id);
        if (!Travel) {
          throw new GraphQLError(`No Travel found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return Travel;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};

export default getTravel;
