import mongoose from "npm:mongoose@7.6.3";
import { ClientModel } from "../schemas/client.ts";
import { DriverModel } from "../schemas/driver.ts";
import { Status } from "../../types.ts";

// Validate if clientID exists in ClientModel
const clientIDExists = async (clientID: mongoose.Types.ObjectId) => {
  try {
    const travel = await ClientModel.findById(clientID).exec();
    return !!travel;
  } catch (_e) {
    return false;
  }
};

// Validate if driverID exists in DriverModel
const driverIDExists = async (driverID: mongoose.Types.ObjectId) => {
  try {
    const travel = await DriverModel.findById(driverID).exec();
    return !!travel;
  } catch (_e) {
    return false;
  }
};

// Validate money, must be greater or equal than 5
const moneyMin = (money: number) => {
  return money >= 5;
};

// Validate distance, must be greater or equal than 0.01
const distanceMin = (distance: number) => {
  return distance >= 0.01;
};

// Validate date format is DD-MM-YYYY
const dateFormat = (date: string) => {
  const re = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  return re.test(date);
};

// Validate date is greater or equal than current date
const dateValid = (date: string) => {
  const [day, month, year] = date.split("-");
  const travelDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();
  return travelDate >= currentDate;
};

// Validate status is Status enum value
const statusValid = (status: string) => {
    return Object.values(Status).includes(status as Status);
}

export const validatorsTravel = {
    clientIDExists,
    driverIDExists,
    moneyMin,
    distanceMin,
    dateFormat,
    dateValid,
    statusValid,
}