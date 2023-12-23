import addCard from "./addCard.ts";
import addClient from "./addClient.ts";
import deleteClient from "./deleteClient.ts";
import addDriver from "./addDriver.ts";
import deleteDriver from "./deleteDriver.ts";
import addTravel from "./addTravel.ts";
import finishTravel from "./finishTravel.ts";
import deleteCard from "./deleteCard.ts";

// Group all mutations in one object
export const Mutation = {
  Mutation: {
    ...addCard.Mutation,
    ...addClient.Mutation,
    ...deleteClient.Mutation,
    ...addDriver.Mutation,
    ...deleteDriver.Mutation,
    ...addTravel.Mutation,
    ...finishTravel.Mutation,
    ...deleteCard.Mutation,
  }, 
}