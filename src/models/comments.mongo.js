const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      reuqired: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      reuqired: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
