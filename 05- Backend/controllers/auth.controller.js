const authService = require('../services/auth.service');
const { isValidEmail } = require('../utils/validations');

/**
 * Controller function to authenticate and login a user.
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password should be at least 6 characters long" });
    }
    const token = await authService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
