import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const deleteClient = {
  Mutation: {
    deleteClient: async (
      _: unknown,
      args: { id: string },
    ): Promise<ClientModelType> => {
      try {
        const id = args.id;
        const deletedClient = await ClientModel.findByIdAndDelete(id);
        if (!deletedClient) {
          throw new GraphQLError(`No Client found with id ${id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return deletedClient;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};
export default deleteClient;
