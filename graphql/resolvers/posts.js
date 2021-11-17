const Post = require("../../Models/Post");
const Comment = require("../../Models/Comment");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { id }) {
      try {
        const post = await Post.findOne({ id });
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {},
};
