
import { DriverModelType } from "../schemas/driver.ts"
import { GraphQLError } from "graphql"
import { TravelModel } from "../schemas/travel.ts";
import { DriverModel } from "../schemas/driver.ts";

export const DriverPostDelete = async function (this: DriverModelType){
    try {
        await TravelModel.updateMany(
            { _id: { $in: this.travels } },
            { driver: null }
        );
    } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
    }
}   