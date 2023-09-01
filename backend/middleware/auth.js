const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer")[1]; // Bearer [dg79a8s079y - token]
    if (token) {
      try {
        const user = jwt.verify(token, "UNSAFE_STRING");
        return user;
      } catch (e) {
        throw new AuthenticationError("Failed authorization token");
      }
    }

    throw new AuthenticationError(
      "Authentication token must be Bearer [token]"
    );
  }
  throw new AuthenticationError("Authentication header must be provided");
};
