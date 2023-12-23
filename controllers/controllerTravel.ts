import { TravelModelType } from "../db/schemas/travel.ts";
import { TravelApi } from "../types.ts";

export const travelModelToTravelApi = (travel: TravelModelType): TravelApi => {
    const Travel: TravelApi = {
        id: travel.id.toString(),
        status: travel.status,
        money: travel.money,
        client: travel.client?.toString() || null,
        driver: travel.driver?.toString() || null,
        distance: travel.distance,
        date: travel.date,
    };
    return Travel;
}