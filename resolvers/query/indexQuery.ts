import getClient from "./getClient.ts";
import getClients from "./getClients.ts";
import getDriver from "./getDriver.ts";
import getDrivers from "./getDrivers.ts";
import getTravel from "./getTravel.ts";
import getTravels from "./getTravels.ts";

// Group all queries in one object
export const Query = {
  Query: { 
    ...getClient.Query,
    ...getClients.Query,
    ...getDriver.Query,
    ...getDrivers.Query,
    ...getTravel.Query,
    ...getTravels.Query,
  },
}