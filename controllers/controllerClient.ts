
import { ClientModelType } from "../db/schemas/client.ts";
import { ClientApi } from "../types.ts";

export const clientModeltoClientApi = (client: ClientModelType) => {
    const Client: ClientApi = {
        id: client.id.toString(),
        name: client.name,
        email: client.email,
        cards: client.cards,
        travels: client.travels.map((travel) => travel.toString()),
    };
    return Client;
}