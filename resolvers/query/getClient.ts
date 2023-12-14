import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const getClient = async (
  _: unknown,
  args: { id: string },
): Promise<ClientModelType> => {
  try {
    const Client = await ClientModel.findById(args.id);
    if (!Client) {
      throw new GraphQLError(`No Client found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return Client;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default getClient;
