const { ApolloServer, gql } = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (parelelo ao REST = GET)
// Mutation -> Manipular dados (paralelo ao REST = POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String, email: String): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: 'Tiggas',
    email: 'tiggas@mail.com',
    active: true,
  },
  {
    _id: String(Math.random()),
    name: 'Tiggas 2',
    email: 'tiggas2@mail.com',
    active: false,
  },
  {
    _id: String(Math.random()),
    name: 'Tiggas 3',
    email: 'tiggas3@mail.com',
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => 'hello world',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));
