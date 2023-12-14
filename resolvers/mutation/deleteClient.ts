import { GraphQLError } from "graphql";
import { ClientModel } from "../../db/schemas/client.ts";

const deleteClient = async (
    _: unknown,
    args: { id: string },
    ): Promise<string> => {
    try {
        const id = args.id;
        const deletedClient = await ClientModel.findByIdAndDelete(id);
        if (!deletedClient) {
        throw new GraphQLError(`No Client found with id ${id}`, {
            extensions: { code: "NOT_FOUND" },
        });
        }
        return `Client with ${id} deleted`;
    } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
    }
    };

export default deleteClient;