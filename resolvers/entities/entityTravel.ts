import { ClientModel, ClientModelType } from "../../db/schemas/client.ts";
import { DriverModel, DriverModelType } from "../../db/schemas/driver.ts";
import { TravelModelType } from "../../db/schemas/travel.ts";

export const Travel = {
  client: async (parent: TravelModelType): Promise<ClientModelType | null>  => {
    const client = await ClientModel.findById(parent.client).exec();
    if (!client) return null;
    client.id = client._id.toString();
    return client;
  },
  driver: async (parent: TravelModelType): Promise<DriverModelType | null> => {
    const driver = await DriverModel.findById(parent.driver).exec();
    if (!driver) return null;
    driver.id = driver._id.toString();
    return driver;
  },
};
