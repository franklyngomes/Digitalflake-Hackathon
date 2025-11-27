const httpCode = require("../../helper/httpServerCode");
const {
  comparePassword,
  hashedPassword,
  hmacProcess,
} = require("../../middleware/auth");
const UserModel = require("../../model/UserModel");
const jwt = require("jsonwebtoken");
const transport = require("../../middleware/sendMail");

class UserController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "All fields are required!",
        });
      }
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(httpCode.conflict).json({
          status: false,
          message: "User with this email already exists",
        });
      }
      if (name.length < 3 || name.length > 30) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Name must be within 3 to 30  characters",
        });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Phone must be of 10 digits",
        });
      }
      const hashed = hashedPassword(password);
      const userData = new UserModel({
        name,
        email,
        password: hashed,
      });

      const codeValue = Math.floor(Math.random() * 1000000).toString();
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      const data = await userData.save();
      return res.status(httpCode.create).json({
        status: true,
        message: "User Signup Successful",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password, signin_remember } = req.body;
      if (!email || !password) {
        res.status(httpCode.notFound).json({
          status: false,
          message: "All fields are required",
        });
      }
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3hr" }
      );
      if (signin_remember === "true") {
        res.cookie("user_email", user.email, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        if (isMatch) {
          res.cookie("user_password", password, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
        }
      }
      if (signin_remember === "false") {
        res.clearCookie("user_email");
        res.clearCookie("user_password");
      }
      if (token) {
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
    next();
  }
  async signOut(req, res) {
    try {
      res.clearCookie("token");
      console.log(token);
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return res.status(httpCode.create).json({
        status: false,
        message: error.message,
      });
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      existingUser.forgotPasswordCode = hashedCodeValue;
      existingUser.forgotPasswordCodeValidation = Date.now();
      await existingUser.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "Reset password code sent!",
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const codeValue = code.toString();
      const existingUser = await UserModel.findOne({ email }).select(
        "+forgotPasswordCode +forgotPasswordCodeValidation"
      );
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found!",
        });
      }
      if (
        !existingUser.forgotPasswordCode ||
        !existingUser.forgotPasswordCodeValidation
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Something went wrong!",
        });
      }
      if (
        Date.now() - existingUser.forgotPasswordCodeValidation >
        5 * 60 * 1000
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Reset password code expired!",
        });
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.forgotPasswordCode) {
        const hashed = hashedPassword(newPassword);
        existingUser.password = hashed;
        existingUser.forgotPasswordCode = undefined;
        existingUser.forgotPasswordCodeValidation = undefined;
        await existingUser.save();
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Password reset successful",
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
