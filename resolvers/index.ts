import Entity from "./entities/indexEntity.ts";
import { Query } from "./query/indexQuery.ts";
import { Mutation } from "./mutation/indexMutation.ts";

// Group entities, queries and mutations in one object
export const resolvers = {
    ...Entity,
    ...Query,
    ...Mutation
};
