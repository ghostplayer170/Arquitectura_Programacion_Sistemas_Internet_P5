import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const addCard = {
  Mutation: {
    addCard: async (
      _: unknown,
      args: {
        client: string;
        number: string;
        cvv: number;
        expirity: string;
        money: number;
      },
    ): Promise<ClientModelType> => {
      try {
        const id = args.client;
        const Card = {
          number: args.number,
          cvv: args.cvv,
          expirity: args.expirity,
          money: args.money,
        };
        const updatedClient = await ClientModel.findByIdAndUpdate(
          id,
          { $push: { cards: Card } },
          { new: true },
        );
        if (!updatedClient) {
          throw new GraphQLError(`No Client found with id ${id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return updatedClient;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  }
}

export default addCard;
