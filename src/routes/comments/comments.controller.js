const comments = require("../../models/comments.mongo");

const createComment = async (req, res) => {
  try {
    const doc = new comments({
      commentText: req.body.commentText,
      user: req.body.userId,
      article: req.body.articleId,
    });

    const comment = await doc.save();
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can`t create comment",
    });
  }
};

const removeComment = async (req, res) => {
  try {
    const id = req.params.commentId;
    await comments.findByIdAndDelete({ _id: id }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Can`t delete comment!",
      });
    });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Can`t find comment!",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    await comments.updateOne(
      { _id: commentId },
      {
        commentText: req.body.commentText,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can`t update comment!",
    });
  }
};

const getCommentsLength = async (req, res) => {
  try {
    const id = req.params.articleId;

    const commentsLength = (await comments.find({ article: id })).length;
    res.status(200).json(commentsLength);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Can`t find comments!",
    });
  }
};

module.exports = {
  createComment,
  removeComment,
  updateComment,
  getCommentsLength,
};
