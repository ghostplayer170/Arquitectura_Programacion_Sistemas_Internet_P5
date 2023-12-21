import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../db/schemas/driver.ts";

const addDriver = {
  Mutation: {
    addDriver: async (
      _: unknown,
      args: {
        name: string;
        email: string;
        username: string;
        travels: [{ id: string }];
      },
    ): Promise<DriverModelType> => {
      try {
        const Driver = new DriverModel({
          name: args.name,
          email: args.email,
          username: args.username,
          travels: args.travels,
        });
        const createdDriver = await Driver.save();
        return createdDriver;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};

export default addDriver;
