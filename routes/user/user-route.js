const express = require("express");
const { userController } = require("../../controllers");
const isAuth = require("../../middlewares/isAuth");

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/update-user").put(isAuth, userController.update);

module.exports = router;
