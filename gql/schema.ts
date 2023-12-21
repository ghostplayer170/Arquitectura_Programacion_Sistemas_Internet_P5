// The GraphQL schema
export const typeDefs = `#graphql
  type Client { 
    id: ID
    name: String!
    email: String!
    cards: [Card!]
    travels: [Travel!]
  }

  type Card { 
    number: Int!
    cvv: Int!
    expirity: String!
    money: Float!
  }

  type Driver {
    id: ID!
    name: String!
    email: String!
    username: String!
    travels: [Travel!]!
  }

  type Travel { 
    id: ID!
    client: Client!
    driver: Driver!
    money: Float!
    distance: Float!
    date: String!
    status: String
  }

  type Query { # Endpoints
    getClients: [Client!]!
    getClient(id: ID!): Client!

    getDrivers: [Driver!]!
    getDriver(id: ID!): Driver!

    getTravels: [Travel!]!
    getTravel(id: ID!): Travel!
  }

  type Mutation { # Endpoints
    addClient(name: String!, email: String!): Client!
    deleteClient(id: ID!): Client!

    addDriver(name: String!, email: String!, username: String!): Driver!
    deleteDriver(id: ID!): Driver!

    addCard(number: Int!, cvv: Int!, expirity: String!, money: Float!): Client!
    deleteCard(id: ID!, number: String!): Client!

    addTravel(client: ID!, driver: ID!, money: Float!, distance: Float!, date: String!): Travel!
    finishTravel(id: ID!, status: String!): Travel!
  }
`;
