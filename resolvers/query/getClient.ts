import { GraphQLError } from "graphql";
import { ClientModel } from "../../db/schemas/client.ts";
import { clientModeltoClient } from "../../controllers/controllerClient.ts";
import { Client } from "../../types.ts";

const getClient = {
  Query: {
    getClient: async (
      _: unknown,
      args: { id: string },
    ): Promise<Client> => {
      try {
        const Client = await ClientModel.findById(args.id).populate({path: 'travels'}).exec();
        if (!Client) {
          throw new GraphQLError(`No Client found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return clientModeltoClient(Client);
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};

export default getClient;
