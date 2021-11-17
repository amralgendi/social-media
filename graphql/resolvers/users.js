const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      if (password !== confirmPassword) {
        throw new UserInputError("Passwords don't match");
      }

      password = await bcrypt.hash(password, 10);

      const res = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      res.save();
      const token = jwt.sign(
        {
          id: res.id,
          email,
          username,
        },
        "Secret",
        { expiresIn: "1h" }
      );
      console.log(res._doc);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
  Query: {},
};
