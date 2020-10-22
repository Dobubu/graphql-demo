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
    posts: [Post]
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
    posts: [Post]
  }

  type Post {
    id: ID!
    author: User
    title: String
    content: String
    likeGivers: [User]
  }

  type Mutation {
    addPost(title: String!, content: String!): Post
    likePost(postId: ID!): Post
  }
`;

const meId = "1"; // 先寫死

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    me: (root, args, context) => {
      const { name } = args;

      return model.getUsers().find((user) => user.name === name);
    },
    users: () => model.getUsers(),
    posts: () => model.getPosts(),
  },
  Mutation: {
    addPost: (root, args, context) => {
      const { title, content } = args;

      model.getPosts().push({
        id: model.getPosts().length + 1,
        authorId: meId,
        title,
        content,
        likeGivers: [],
      });

      return model.getPosts()[model.getPosts().length - 1];
    },
    likePost: (root, args, context) => {
      const { postId } = args;
      const post = model.findPostById(postId);

      if (!post) throw new Error(`Post ${psotId} Not Exists`);

      if (post.likeGiverIds.includes(meId)) {
        const index = post.likeGiverIds.findIndex((v) => v === userId);

        post.likeGiverIds.splice(index, 1);
      } else {
        post.likeGiverIds.push(meId);
      }
      
      return post;
    },
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
    },
    posts: (parent, args, context) => {
      const { id } = parent;

      return model.filterPostsByAuthorId(id);
    },
  },
  Post: {
    likeGivers: (parent, args, context) => {
      const { likeGiverIds } = parent;

      return likeGiverIds.map((id) => model.findUserById(id));
    },
    author: (parent, args, context) => {
      const { authorId } = parent;

      return model.findUserById(authorId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
