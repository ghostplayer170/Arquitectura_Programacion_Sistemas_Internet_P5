// The GraphQL schema
export const typeDefs = `#graphql
  type Client { 
    id: ID!
    name: String!
    email: String!
    cards: [Card!]
    travels: [Travel!]
  }

  type Card { 
    number: String!
    cvv: String!
    expirity: String!
    money: Float!
  }

  type Driver {
    id: ID!
    name: String!
    email: String!
    username: String!
    travels: [Travel!]
  }

  type Travel { 
    id: ID!
    client: Client!
    driver: Driver!
    money: Float!
    distance: Float!
    date: String!
    status: Status
  }

  type Query { # Endpoints
    clients: [Client!]!
    client(id: ID!): Client!

    drivers: [Driver!]!
    driver(id: ID!): Driver!

    travels: [Travel!]!
    travel(id: ID!): Travel!
  }

  type Mutation { # Endpoints
    createClient(name: String!, email: String!): Client!
    deleteClient(id: ID!): Client!

    createDriver(name: String!, email: String!, username: String!): Driver!
    deleteDriver(id: ID!): Driver!

    addCard(number: String!, cvv: String!, expirity: String!, money: Float!): Client!
    deleteCard(id: ID!, number: String!): Client!

    createTravel(client: ID!, driver: ID!, money: Float!, distance: Float!, date: String!): Travel!
    updateTravel(id: ID!, status: String!): Travel!
  }
`;