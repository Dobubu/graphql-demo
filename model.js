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

module.exports = {
  getUsers: () => users,
};
