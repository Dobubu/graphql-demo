const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const model = require("./model");

const typeDefs = gql`
  """
  高度單位
  """
  enum HeightUnit {
    METRE
    CENTIMETER
    FOOT
  }

  """
  重量單位
  """
  enum WeightUnit {
    KILOGRAM
    GRAM
    POUND
  }

  type Query {
    hello: String
    me(name: String!): User
    users: [User]
  }

  type User {
    id: ID!
    name: String
    email: String
    gender: String
    friends: [User]
    height(unit: HeightUnit = CENTIMETER): Float
    weight(unit: WeightUnit = KILOGRAM): Float
    birthDay: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    me: (root, args, context) => {
      const { name } = args;

      return model.getUsers().find((user) => user.name === name);
    },
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
    height: (parent, args) => {
      const { unit } = args;

      if (!unit || unit === "CENTIMETER") return parent.height;
      if (unit === "METRE") return parent.height / 100;
      if (unit === "FOOT") return parent.height / 30.48;
      throw new Error(`Height unit "${unit}" not supported.`);
    },
    weight: (parent, args, context) => {
      const { unit } = args;

      if (!unit || unit === "KILOGRAM") return parent.weight;
      else if (unit === "GRAM") return parent.weight * 100;
      else if (unit === "POUND") return parent.weight / 0.45359237;
      throw new Error(`Weight unit "${unit}" not supported.`);
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
