const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");
require("dotenv").config();

const Post = require("./Models/Post");
const User = require("./Models/User");

const typeDefs = require("./graphql/typeDefs");

const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("connected to database");
  return server
    .listen(5000)
    .then((res) => console.log(`server running at ${res.url}`));
});
