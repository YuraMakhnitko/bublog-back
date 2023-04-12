const multer = require("multer");

const storageAvatar = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "src/uploads/avatars");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const storageArticles = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "src/uploads/articles");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = { storageAvatar, storageArticles };
