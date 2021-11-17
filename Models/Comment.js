const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  username: String,
  body: String,
  createdAt: String,
  post: String,
});

module.exports = model("Comment", commentSchema);
