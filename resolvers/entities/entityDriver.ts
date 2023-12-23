import { DriverModelType } from "../../db/schemas/driver.ts";
import { TravelModel, TravelModelType } from "../../db/schemas/travel.ts";

// Resolver for Driver.travels field
export const Driver = {
    travels: async (parent: DriverModelType): Promise<TravelModelType[]> => {
        const travels = await TravelModel.find({ _id: { $in: parent.travels } }).exec();
        travels.forEach((travel) => {
            travel.id = travel._id.toString();
        });
        return travels;
    },
};