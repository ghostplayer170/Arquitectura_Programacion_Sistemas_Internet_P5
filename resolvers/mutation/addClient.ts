import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const addClient = async (
  _: unknown,
  args: {
    name: string;
    email: string;
    cards: [{
      number: number;
      cvv: number;
      expirity: string;
      money: number;
    }];
    travels: [{ id: string }];
  },
): Promise<ClientModelType> => {
  try {
    const Client = new ClientModel({
      name: args.name,
      email: args.email,
      cards: args.cards,
      travels: args.travels,
    });
    const createdClient = await Client.save();
    return createdClient;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default addClient;
