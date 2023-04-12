const express = require("express");
const checkAuth = require("../../services/checkAuth");
const { addArticleValidation } = require("../../services/validations");
const { validationErrors } = require("../../services/handleValidationErrors");

const {
  createArticle,
  getArticlesByCategory,
  getOneArticle,
  removeArticle,
  updateArticle,
  searchArticles,
} = require("./articles.controller");

const articlesByCategoryRouter = express.Router();
const createArticleRouter = express.Router();
const getOneArticleRouter = express.Router();
const removeArticleRouter = express.Router();
const updateArticleRouter = express.Router();
const searchArticlesRouter = express.Router();

createArticleRouter.post(
  "/addarticle",
  checkAuth,
  addArticleValidation,
  validationErrors,
  createArticle
);

articlesByCategoryRouter.post("/category", getArticlesByCategory);
getOneArticleRouter.get("/articles/:articleId", getOneArticle);

removeArticleRouter.delete("/articles/:articleId", checkAuth, removeArticle);

updateArticleRouter.patch(
  "/articles/:articleId",
  checkAuth,
  addArticleValidation,
  validationErrors,
  updateArticle
);
searchArticlesRouter.get("/search/:value", searchArticles);

module.exports = {
  createArticleRouter,
  articlesByCategoryRouter,
  getOneArticleRouter,
  removeArticleRouter,
  updateArticleRouter,
  searchArticlesRouter,
};
