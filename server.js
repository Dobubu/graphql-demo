const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const model = require('./model')

const typeDefs = gql`
  type Query {
    hello: String
    me: User
    users: [User]
  }

  type User {
    id: ID!
    name: String
    email: String
    gender: String
    friends: [User]
    height: Float
    weight: Float
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    me:() => model.getUsers()[0],
    users:() => model.getUsers(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);