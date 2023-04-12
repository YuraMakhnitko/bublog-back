const express = require("express");
const appRouter = express();
const {
  registerRouter,
  loginRouter,
  localSavedUser,
  addAvatar,
} = require("./users/users.router");

const {
  createArticleRouter,
  articlesByCategoryRouter,
  getOneArticleRouter,
  removeArticleRouter,
  updateArticleRouter,
  searchArticlesRouter,
} = require("./articles/articles.router");

const {
  createCommentRouter,
  removeCommentRouter,
  updateCommentRouter,
  getCommentsLengthRouter,
} = require("./comments/comments.router");

appRouter.use(
  registerRouter,
  loginRouter,
  localSavedUser,
  addAvatar,
  articlesByCategoryRouter,
  getOneArticleRouter,
  createArticleRouter,
  removeArticleRouter,
  updateArticleRouter,
  searchArticlesRouter,
  createCommentRouter,
  removeCommentRouter,
  updateCommentRouter,
  getCommentsLengthRouter
);

module.exports = { appRouter };
