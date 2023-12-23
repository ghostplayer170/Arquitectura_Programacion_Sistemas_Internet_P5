import { GraphQLError } from "graphql";
import { ClientModel } from "../../db/schemas/client.ts";
import { clientModeltoClientApi } from "../../controllers/controllerClient.ts";
import { ClientApi } from "../../types.ts";

const getClients = {
  Query: {
    getClients: async (): Promise<ClientApi[]> => {
      try {
        const Clients = await ClientModel.find().exec();
        if (!Clients) {
          throw new GraphQLError(`No Clients found`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return Clients.map((Client) => clientModeltoClientApi(Client));
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};  

export default getClients;
