import { GraphQLError } from "graphql";
import { ClientModel } from "../../db/schemas/client.ts";
import { clientModeltoClientApi } from "../../controllers/controllerClient.ts";
import { ClientApi } from "../../types.ts";

const getClient = {
  Query: {
    getClient: async (
      _: unknown,
      args: { id: string },
    ): Promise<ClientApi> => {
      try {
        const Client = await ClientModel.findById(args.id).exec();
        if (!Client) {
          throw new GraphQLError(`No Client found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return clientModeltoClientApi(Client);
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};

export default getClient;
