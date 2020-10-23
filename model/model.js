const users = [
  {
    id: "1",
    name: "Fong",
    email: "fong@test.com",
    password: "123456",
    age: 25,
    friendIds: ["2", "3"],
    height: 175.0,
    weight: 70.0,
    birthDay: "1997-10-22",
  },
  {
    id: "2",
    name: "Kevin",
    email: "kevin@test.com",
    password: "kevin123456",
    age: 40,
    height: 185.0,
    weight: 90.0,
    friendIds: ["1"],
  },
  {
    id: "3",
    name: "Mary",
    email: "Mary@test.com",
    password: "mary123456",
    age: 18,
    height: 162,
    weight: null,
    friendIds: ["1"],
  },
];

const posts = [
  {
    id: "1",
    authorId: "1",
    title: "TypeScript",
    createdAt: "2020-10-10",
    excerpt: "TypeScript extends JavaScript by adding types.",
    content:
      "By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.",
    likeGiverIds: ["2"],
  },
  {
    id: "2",
    authorId: "2",
    title: "GraphQL",
    createdAt: "2020-09-09",
    excerpt: "A query language for your API",
    content:
      "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
    likeGiverIds: ["2", "3"],
  },
  {
    id: "3",
    authorId: "2",
    title: "RxJs",
    createdAt: "2020-08-08",
    excerpt: "Think of RxJS as Lodash for events.",
    content:
      "RxJS is a library for composing asynchronous and event-based programs by using observable sequences.",
    likeGiverIds: ["2", "3"],
  },
];

module.exports = {
  getUsers: () => users,
  getPosts: () => posts,
  findUserById: id => users.find(user => user.id === id),
  findUserByName: name => users.find(user => user.name === name),
  filterPostsByAuthorId: authorId => posts.filter(post => post.authorId === authorId)
};
