import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const addClient = {
  Mutation: {
    addClient: async (
      _: unknown,
      args: {
        name: string;
        email: string;
      },
    ): Promise<ClientModelType> => {
      try {
        const Client = new ClientModel({
          name: args.name,
          email: args.email,
        });
        const createdClient = await Client.save();
        return createdClient;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
}

export default addClient;
