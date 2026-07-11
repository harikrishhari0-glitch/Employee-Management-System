const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");

const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // Validation
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if email already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user
    await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// Placeholder functions (we'll implement these next)

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required."
      });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found."
      });
    }

    const otp = generateOTP();

    await User.saveOTP(email, otp);

    console.log("================================");
    console.log("OTP FOR:", email);
    console.log(otp);
    console.log("================================");

    return res.status(200).json({
      success: true,
      message: "OTP generated successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

const resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and New Password are required."
      });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const hashedPassword = await hashPassword(password);

    await User.updatePassword(email, hashedPassword);

    return res.status(200).json({
      success: true,
      message: "Password reset successful."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required."
      });
    }

    const latestOTP = await User.getLatestOTP(email);

    if (!latestOTP) {
      return res.status(404).json({
        success: false,
        message: "OTP not found."
      });
    }

    if (latestOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP."
      });
    }

    await User.verifyUser(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyOTP,
};