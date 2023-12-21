import { DriverModel } from "../schemas/driver.ts";

// Validate name format (only letters and spaces) and length (2-30)
const nameFormat = (name: string) => {
  const re = /^[a-zA-Z ]{2,30}$/;
  return re.test(name);
};

// Validate email format (email@domain)
const emailFormat = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Validate if email exists in DriverModel
const emailExists = async (email: string) => {
  try {
    const driver = await DriverModel.findOne({ email }).exec();
    if (driver) return false;
    return true;
  } catch (_e) {
    return false;
  }
};

// Vadlidate if username exists in DriverModel
const usernameExists = async (username: string) => {
  try {
    const driver = await DriverModel.findOne({ username }).exec();
    if (driver) return false;
    return true;
  } catch (_e) {
    return false;
  }
};

export const validatorsDriver = { 
    emailExists, 
    emailFormat, 
    nameFormat, 
    usernameExists
};
