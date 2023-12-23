import { ClientModelType } from "../../db/schemas/client.ts";
import { TravelModel, TravelModelType } from "../../db/schemas/travel.ts";

export const Client = {
    travels: async (parent: ClientModelType): Promise<TravelModelType[]> => {
        const travels = await TravelModel.find({ _id: { $in: parent.travels } }).exec();
        travels.forEach((travel) => {
            travel.id = travel._id.toString();
        });
        return travels;
    },
};