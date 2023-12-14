import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const Clients = async (): Promise<ClientModelType[]> => {
  try {
    const Clients = await ClientModel.find().exec();
    if (!Clients) {
      throw new GraphQLError(`No Clients found`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return Clients;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default Clients;
