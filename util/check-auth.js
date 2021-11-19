const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "Secret");
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be as: Bearer [token]");
  }
  throw new Error("Authentication Header must be provided");
};
