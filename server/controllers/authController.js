const User = require("../modles/User");
const sendEmail = require("../utils/sendEmail.js");
const jwt = require("jsonwebtoken");

const generateAuthToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already present" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // otp valid for 10 mins
    const user = await User.create({
      username,
      email,
      password,
      otp,
      otpExpiry,
    });
   res.status(201).json({
  message: "User registered Successfully",
  userId: user._id,
  user: {
    username: user.username,
    email: user.email,
  },
});

    // otp Sending logic
    try {
      await sendEmail({
  to: email,
  subject: "Your verification code - AI Cold Mail Generator",
  text: `Your verification code is ${otp}. This code will expire in 10 minutes. If you did not request this code, you can safely ignore this email.`,
});
    } catch (error) {
      console.error({ message: "Error Sending OTP", error: error.message });
      next(error);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "email and otp are required" });
    }
    const user = await User.findOne({ email }).select("+otp +otpExpiry");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.isVerified = true;
    await user.save();
    const token = generateAuthToken(user._id);
    return res.status(200).json({
  token,
  message: "OTP verified successfully",
  user: {
    username: user.username,
    email: user.email,
  },
});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email }).select("+password +isVerified");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "User not verified. Please verify your email first.",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateAuthToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error", error);
  }
};


exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("+otp +otpExpiry");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // OTP valid for 10 minutes
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    // Send new OTP
    await sendEmail({
  to: email,
  subject: "Your verification code - AI Cold Mail Generator",
  text: `Your verification code is ${otp}. This code will expire in 10 minutes. If you did not request this code, you can safely ignore this email.`,
});

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error resending OTP:", error);

    return res.status(500).json({
      message: "Failed to resend OTP",
    });
  }
};