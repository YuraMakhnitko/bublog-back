const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    category: {
      type: Number,
      reuqired: true,
    },
    title: {
      type: String,
      reuqired: true,
    },
    articleText: {
      type: String,
      reuqired: true,
    },
    articleImgUrl: String,
    imgArticleUrl: String,
    imgArticle: {
      data: Buffer,
      contentType: String,
    },
    vievCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      reuqired: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('article', articleSchema);
