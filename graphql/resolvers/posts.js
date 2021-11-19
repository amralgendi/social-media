const Post = require("../../Models/Post");
const Comment = require("../../Models/Comment");
const checkAuth = require("../../util/check-auth");

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
        const post = await Post.findById(id);
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
  },
};
