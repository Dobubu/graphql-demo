const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const model = require("./model");

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
    birthDay: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    me: () => model.getUsers()[0],
    users: () => model.getUsers(),
  },
  User: {
    name: (parent, args, context) => {
      const dateByToday = new Date();
      const dateByBirthday = new Date(parent.birthDay);

      const today = {
        month: dateByToday.getMonth() + 1,
        date: dateByToday.getDate(),
      };
      const birthDay = {
        month: dateByBirthday.getMonth() + 1,
        date: dateByBirthday.getDate(),
      };

      if (today.month === birthDay.month && today.date === birthDay.date) {
        return parent.name + " ~~ Happy Birthday";
      }
      
      return parent.name;
    },
    friends: (parent, args, context) => {
      const { friendIds } = parent;

      return model.getUsers().filter((user) => friendIds.includes(user.id));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
