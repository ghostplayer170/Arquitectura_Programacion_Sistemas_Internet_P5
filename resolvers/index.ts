import Entity from "./entities/indexEntity.ts";
import { Query } from "./query/indexQuery.ts";
import { Mutation } from "./mutation/indexMutation.ts";

export const resolvers = {
    ...Entity,
    ...Query,
    ...Mutation
};
