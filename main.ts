import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; // Leer variables de entorno
import { typeDefs } from "./typeDefs.ts";
const env = await load(); // Carga Variables de entorno

// Variables de entorno.
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL") || "mongodb+srv://rmontenegrop:Lllubo6BT2sVncJg@clusteruni.pagju8q.mongodb.net/DataBaseRepasoParcial?retryWrites=true&w=majority";
const PORT = env.PORT || Deno.env.get("PORT") || 4050;

// Verifica variables de entorno.
if (!MONGO_URL || !PORT) {
  console.log("No mongo URL or Port found");
  Deno.exit(1);
}

// Conexión a la base de datos MongoDB.
try{
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
}catch(e){
  console.error(e);
}

const server = new ApolloServer({
  typeDefs: typeDefs,
});

const { url } = await startStandaloneServer(server,{
  listen: {
    port: PORT,
  }
});

console.log(`🚀 Server ready at ${url}`);