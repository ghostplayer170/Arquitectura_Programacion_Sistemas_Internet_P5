import { DriverModelType } from "../db/schemas/driver.ts";
import { DriverApi } from "../types.ts";

export const driverModelToDriverApi = (driver: DriverModelType) => {
  const Driver: DriverApi = {
    id: driver.id.toString(),
    name: driver.name,
    email: driver.email,
    username: driver.username,
    travels: driver.travels.map((travel) => travel.toString()),
  };
  return Driver;
};
