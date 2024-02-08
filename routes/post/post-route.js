const express = require("express");
const isAuth = require("../../middlewares/isAuth");
const postController = require("../../controllers/post/postController");
const router = express.Router();

router.route("/create").post(isAuth, postController.create);
router.route("/get-all").get(postController.getAll);
router.route("/get-user-post").get(isAuth, postController.getUserPost);
router.route("/delete/:id").delete(isAuth, postController.destory);
router.route("/update/:id").put(isAuth, postController.update);

module.exports = router;
