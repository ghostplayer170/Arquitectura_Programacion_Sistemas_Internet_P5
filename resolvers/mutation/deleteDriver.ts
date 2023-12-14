import { GraphQLError } from "graphql";
import { DriverModel } from "../../db/schemas/driver.ts";

const deleteDriver = async (
  _: unknown,
  args: { id: string },
): Promise<string> => {
  try {
    const id = args.id;
    const deletedDriver = await DriverModel.findByIdAndDelete(id);
    if (!deletedDriver) {
      throw new GraphQLError(`No Driver found with id ${id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return `Driver with ${id} deleted`;
  } catch (error) {
    throw new GraphQLError(`Error: ${error}`);
  }
};

export default deleteDriver;
