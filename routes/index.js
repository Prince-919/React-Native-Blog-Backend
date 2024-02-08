const express = require("express");
const usersRoute = require("./user/user-route");
const postsRoute = require("./post/post-route");

const router = express.Router();

router.use("/auth", usersRoute);
router.use("/post", postsRoute);

module.exports = router;
