
import { ClientModelType } from "../db/schemas/client.ts";

export const clientModeltoClient = (clientDoc: ClientModelType) => {
    // Convert Mongoose document to plain JavaScript object
    const clientObj = clientDoc.toObject();
    // Rename _id to id
    clientObj.id = clientObj._id;
    delete clientObj._id;
    return clientObj;
}