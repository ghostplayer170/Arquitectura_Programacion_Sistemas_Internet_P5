import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../db/schemas/driver.ts";

const Drivers = async (): Promise<DriverModelType[]> => {
  try {
    const Drivers = await DriverModel.find().exec();
    if (!Drivers) {
      throw new GraphQLError(`No Drivers found`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return Drivers;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default Drivers;