import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";

const deleteCard = async (
  _: unknown,
  args: { idClient: string; cardNumber: number },
): Promise<ClientModelType> => {
  try {
    const id = args.idClient;
    const number = args.cardNumber;
    const updatedClient = await ClientModel.findByIdAndUpdate(
      id,
      { $pull: { cards: { number: number } } },
      { new: true },
    );
    if (!updatedClient) {
      throw new GraphQLError(
        `No Client found with id ${id} or No Card found with number ${number}`,
        { extensions: { code: "NOT_FOUND" } },
      );
    }
    return updatedClient;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default deleteCard;
