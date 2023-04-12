const express = require("express");

const { register, login, update, getMe } = require("./users.controller");
const checkAuth = require("../../services/checkAuth");
const {
  loginValidation,
  registerValidation,
} = require("../../services/validations");
const { validationErrors } = require("../../services/handleValidationErrors");

const registerRouter = express.Router();
const loginRouter = express.Router();
const addAvatar = express.Router();
const localSavedUser = express.Router();

registerRouter.post(
  "/auth/register",
  registerValidation,
  validationErrors,
  register
);
loginRouter.post("/auth/login", loginValidation, validationErrors, login);
addAvatar.patch(`/account/:id`, checkAuth, update);
localSavedUser.get("/auth/me", checkAuth, getMe);

module.exports = { registerRouter, loginRouter, addAvatar, localSavedUser };
