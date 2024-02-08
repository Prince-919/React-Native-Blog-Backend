const { JWT_SECRET } = require("../../config");
const { hashPassword, comparePassword } = require("../../helpers");
const { UserModel } = require("../../models");
const JWT = require("jsonwebtoken");

const userController = {
  // Register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).send({
          success: false,
          message: "Name is required",
        });
      }
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email is required",
        });
      }
      if (!password || password.length < 6) {
        return res.status(400).send({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const exisitingUser = await UserModel.findOne({ email });
      if (exisitingUser) {
        return res.status(500).send({
          success: false,
          message: "User already exists",
        });
      }
      const hashedpassword = await hashPassword(password);
      const user = new UserModel({
        name,
        email,
        password: hashedpassword,
      });
      await user.save();
      res.status(201).send({
        success: true,
        message: "Registered successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while registering",
      });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).send({
          success: false,
          message: "Email is required",
        });
      }
      if (!password) {
        return res.status(400).send({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(500).send({
          success: false,
          message: "User does not exist",
        });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(500).send({
          success: false,
          message: "Invalid username or password",
        });
      }

      const token = await JWT.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      user.password = undefined;
      res.status(200).send({
        success: true,
        message: "Logged in successfully",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while login",
      });
    }
  },

  // Update User
  async update(req, res) {
    try {
      const { name, password, email } = req.body;

      const user = await UserModel.findOne({ email });

      if (password && password.length < 6) {
        return res.status(400).send({
          success: false,
          message: "Password is required and should be 6 character long",
        });
      }

      const hashedpassword = password
        ? await hashPassword(password)
        : undefined;

      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        {
          name: name || user?.name,
          password: hashedpassword || user?.password,
        },
        { new: true }
      );
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Profile updated successfully or please login",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "User update failed",
        error,
      });
    }
  },
};
module.exports = userController;
