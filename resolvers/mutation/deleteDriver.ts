import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../db/schemas/driver.ts";

const deleteDriver = {
  Mutation: {
    deleteDriver: async (
      _: unknown,
      args: { id: string },
    ): Promise<DriverModelType | null> => {
      try {
        const id = args.id;
        const deletedDriver = await DriverModel.findByIdAndDelete(id);
        if (!deletedDriver) {
          throw new GraphQLError(`No Driver found with id ${id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return deletedDriver;
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`);
      }
    },
  },
};

export default deleteDriver;