const express = require("express");

const checkAuth = require("../../services/checkAuth");
const { addCommentValidation } = require("../../services/validations");
const { validationErrors } = require("../../services/handleValidationErrors");

const {
  createComment,
  removeComment,
  updateComment,
  getCommentsLength,
} = require("./comments.controller");

const createCommentRouter = express.Router();
const removeCommentRouter = express.Router();
const updateCommentRouter = express.Router();
const getCommentsLengthRouter = express.Router();

createCommentRouter.post(
  "/addcomment",
  checkAuth,
  addCommentValidation,
  validationErrors,
  createComment
);

removeCommentRouter.delete(`/comments/:commentId`, checkAuth, removeComment);

updateCommentRouter.patch(
  `/comments/:commentId`,
  checkAuth,
  addCommentValidation,
  validationErrors,
  updateComment
);
getCommentsLengthRouter.get(`/comments/:articleId`, getCommentsLength);

module.exports = {
  createCommentRouter,
  removeCommentRouter,
  updateCommentRouter,
  getCommentsLengthRouter,
};
