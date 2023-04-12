const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModelMongo = require("../../models/users.mongo");

const register = async (req, res) => {
  try {
    // password from fe input
    const password = req.body.password;

    //   crypting password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //   creating doc of new user
    const doc = new UserModelMongo({
      email: req.body.email,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    //   save new user
    const user = await doc.save();

    //   creating token fro user
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret888",
      { expiresIn: "999d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can`t register properly!",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModelMongo.findOne(
      { email: req.body.email },
      { __v: 0 }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Invalid login or password!",
      });
    }

    const token = jwt.sign({ _id: user._id }, "secret888", {
      expiresIn: "999d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can`t auth properly!",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModelMongo.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "No access",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    await UserModelMongo.updateOne(
      {
        _id: id,
      },
      { avatarUrl: req.body.avatarUrl },
      {
        returnDocument: "after",
      },
      (error, doc) => {
        res.json(doc);
      }
    );
  } catch (error) {}
};

module.exports = { register, login, update, getMe };
