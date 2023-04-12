const { body } = require("express-validator");

const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 symbols").isLength({ min: 8 }),
];

const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 symbols").isLength({ min: 8 }),
  body("name", "Enter your name").isLength({ min: 3, max: 15 }),
  body("avatarUrl", "Invalid link to avatar").optional().isURL(),
];

const addArticleValidation = [
  body("title", "Enter the title").isLength({ min: 3 }).isString(),
  body("articleText", "Enter the text").isLength({ min: 10 }).isString(),
  body("category", "Choose category").isNumeric({ min: 2, max: 6 }),
  body("articleImgUrl", "Invalid link to image").optional().isURL(),
];
const addCommentValidation = [body("commentText", "Enter the text").isString()];

module.exports = {
  loginValidation,
  registerValidation,
  addArticleValidation,
  addCommentValidation,
};
