import { ClientModel } from "../schemas/client.ts";

// Validate name format (only letters and spaces) and length (2-30)
const nameFormat = (name: string) => {
  const re = /^[a-zA-Z ]{2,30}$/;
  return re.test(name);
};

// Validate if email exists in ClientModel
const emailExists = async (email: string) => {
  try {
    const client = await ClientModel.findOne({ email }).exec();
    if (client) return false;
    return true;
  } catch (_e) {
    return false;
  }
};

// Validate email format (email@domain)
const emailFormat = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Validate if card exists in ClientModel
const cardExists = async (number: string) => {
  try {
    const client = await ClientModel.findOne({ cards: { $elemMatch: { number } } }).exec();
    if (client) return false;
    return true;
  } catch (_e) {
    return false;
  }
};

// Validate card number format (16 digits)
const cardNumberFormat = (number: string) => {
  const re = /^[0-9]{16}$/;
  return re.test(number);
};

// Validate card cvv format (3 digits)
const cardCvvFormat = (cvv: number) => {
  const re = /^[0-9]{3}$/;
  return re.test(cvv.toString());
};

// Validate card expirity Format: MM/YYYY (MM: 01-12, YYYY)
const cardExpirityFormat = (expirity: string) => {
  const re = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
  return re.test(expirity);
};

// Validate card expirity date is greater or equal than current date
const cardExpirityDate = (expirity: string) => {
  const [month, year] = expirity.split("/");
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  return (parseInt(year) > currentYear) ||
    (parseInt(year) === currentYear && parseInt(month) >= currentMonth);
};

// Validate card money format (must be greater or equal than 0)
const cardMoneyFormat = (money: number) => {
  return money >= 0;
};

export const validatorsClient = {
  nameFormat,
  emailExists,
  emailFormat,
  cardExists,
  cardNumberFormat,
  cardCvvFormat,
  cardExpirityFormat,
  cardExpirityDate,
  cardMoneyFormat,
};
