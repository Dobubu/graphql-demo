const meId = 1;

const users = [
  {
    id: 1,
    email: "fong@test.com",
    password: "$2b$04$wcwaquqi5ea1Ho0aKwkZ0e51/RUkg6SGxaumo8fxzILDmcrv4OBIO",
    name: "Fong",
    age: 23,
    friendIds: [2, 3],
  },
  {
    id: 2,
    email: "kevin@test.com",
    passwrod: "$2b$04$uy73IdY9HVZrIENuLwZ3k./0azDvlChLyY1ht/73N4YfEZntgChbe",
    name: "Kevin",
    age: 40,
    friendIds: [1],
  },
  {
    id: 3,
    email: "mary@test.com",
    password: "$2b$04$UmERaT7uP4hRqmlheiRHbOwGEhskNw05GHYucU73JRf8LgWaqWpTy",
    name: "Mary",
    age: 18,
    friendIds: [1],
  },
];

const posts = [
  {
    id: 1,
    authorId: 1,
    title: "Hello World",
    body: "This is my first post",
    likeGiverIds: [1, 2],
    createdAt: "2018-10-22T01:40:14.941Z",
  },
  {
    id: 2,
    authorId: 2,
    title: "TypeScript",
    body: "TypeScript extends JavaScript by adding types.",
    likeGiverIds: [1],
    createdAt: "2018-10-24T01:40:14.941Z",
  },
  {
    id: 3,
    authorId: 1,
    title: "GraphQL",
    body: "A query language for your API",
    likeGiverIds: [3],
    createdAt: "2018-10-12T01:40:14.941Z",
  },
];

const findUserByUserId = (userId) =>
  users.find((user) => user.id === Number(userId));

const findPostByPostId = (postId) =>
  posts.find((post) => post.id === Number(postId));

module.exports = {
  // get
  meId,
  getUsers: () => users,
  getPosts: () => posts,
  filterPostsByUserId: (userId) =>
    posts.filter((post) => post.authorId === userId),
  filterUsersByUserIds: (userIds) =>
    users.filter((user) => userIds.includes(user.id)),
  findUserByUserId,
  findUserByName: (name) => users.find((user) => user.name === name),
  findPostByPostId,
  // post
  updateUserInfo: (userId, data) =>
    Object.assign(findUserByUserId(userId), data),
  addPost: ({ authorId, title, body }) =>
    (posts[posts.length] = {
      id: posts[posts.length - 1].id + 1,
      authorId,
      title,
      body,
      likeGiverIds: [],
      createdAt: new Date().toISOString(),
    }),
  updatePost: (postId, data) => Object.assign(findPostByPostId(postId), data),
};
