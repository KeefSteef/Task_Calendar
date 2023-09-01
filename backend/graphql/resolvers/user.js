const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createUser(_, { registerInput: { email, password, username } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError("User with this email already register");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email.toLowerCase(),
        password: encryptedPassword,
        username: username,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "1h",
      });

      newUser.token = token;

      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        user.token = jwt.sign({ email, id: user._id }, "UNSAFE_STRING", {
          expiresIn: "1h",
        });

        return {
          id: user._id,
          ...user._doc,
        };
      }
    },
  },
};
