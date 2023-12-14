import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../db/schemas/driver.ts";

const getDriver = async (
  _: unknown,
  args: { id: string },
): Promise<DriverModelType> => {
  try {
    const Driver = await DriverModel.findById(args.id);
    if (!Driver) {
      throw new GraphQLError(`No Driver found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return Driver;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default getDriver;
