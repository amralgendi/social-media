const { model, Schema } = require("mongoose");

const likeSchema = new Schema({
  username: String,
  createdAt: String,
  post: String,
});

module.exports = model("Like", likeSchema);
