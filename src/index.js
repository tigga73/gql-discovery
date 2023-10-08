const { ApolloServer, gql } = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (parelelo ao REST = GET)
// Mutation -> Manipular dados (paralelo ao REST = POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));
