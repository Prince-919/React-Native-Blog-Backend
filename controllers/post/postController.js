const { PostModel } = require("../../models");

const postController = {
  // Create
  async create(req, res) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(500).send({
          success: false,
          message: "Please add a post title",
        });
      }

      if (!description) {
        return res.status(500).send({
          success: false,
          message: "Please add  post description",
        });
      }

      const post = await PostModel({
        title,
        description,
        postedBy: req.auth.userId,
      }).save();

      res.status(201).send({
        success: true,
        message: "Created successfully",
        post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while creating post",
      });
    }
  },

  // All Post
  async getAll(req, res) {
    try {
      const posts = await PostModel.find()
        .populate("postedBy", "_id name")
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: "fetched all posts",
        posts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting all posts",
      });
    }
  },

  // Get User Post
  async getUserPost(req, res) {
    try {
      const userPosts = await PostModel.find({ postedBy: req.auth.userId });
      res.status(200).send({
        sucess: true,
        message: "fetched user post",
        userPosts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting user post",
      });
    }
  },

  // Delete
  async destory(req, res) {
    try {
      const { id } = req.params;
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting post",
      });
    }
  },

  // Update
  async update(req, res) {
    try {
      const { title, description } = req.body;
      const post = await PostModel.findById({ _id: req?.params?.id });
      if (!title || !description) {
        return res.status(500).send({
          success: false,
          message: "Please provide a title and description",
        });
      }
      const updatedPost = await PostModel.findByIdAndUpdate(
        { _id: req?.params?.id },
        {
          title: title || post?.title,
          description: description || post?.description,
        },
        {
          new: true,
        }
      );
      res.status(200).send({
        success: true,
        message: "Updated successfully",
        updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while updating post",
      });
    }
  },
};

module.exports = postController;
