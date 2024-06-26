const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const errorMessages = require("../constants/errorMessages");
dotenv.config();

/**
 * Service function to authenticate and generate JWT token for a user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} A Promise that resolves with the JWT token.
 */
exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error(errorMessages.INCORRECT_PASSWORD);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return token;
  } catch (error) {
    switch (error.message) {
      case errorMessages.USER_NOT_FOUND:
        return errorMessages.USER_NOT_FOUND;
      case errorMessages.INCORRECT_PASSWORD:
        return errorMessages.INCORRECT_PASSWORD;
      default:
        return errorMessages.GENERIC_ERROR;
    }
  }
};
