const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");

const Post = require("./Models/Post");
const User = require("./Models/User");

const typeDefs = require("./graphql/typeDefs");

const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(
    "mongodb+srv://amralgendi:Amoura20000@cluster0.mn6f7.mongodb.net/social-media?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to database");
    return server
      .listen(5000)
      .then((res) => console.log(`server running at ${res.url}`));
  });
