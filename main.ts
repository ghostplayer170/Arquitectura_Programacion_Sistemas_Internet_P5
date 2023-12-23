import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { typeDefs } from "./gql/schema.ts";
import { resolvers } from "./resolvers/index.ts";

const env = await load(); // Load env variables

// Obtain mongo url and port from env or Deno.env
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("PORT");

// Verify if exist mongo url and port
if (!MONGO_URL || !PORT) {
  console.log("No mongo URL or Port found");
  Deno.exit(1);
}

// Conextion to mongoDB
try {
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
} catch (e) {
  console.error(e);
}

// Create Apollo Server
const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

// Start Apollo Server
const { url } = await startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
});

console.log(`🚀 Server ready at ${url}`);
