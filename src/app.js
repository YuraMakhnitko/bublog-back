const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { storageAvatar, storageArticles } = require('./storage');

const { appRouter } = require('./routes/app.router');

const app = express();

const uploadAvatar = multer({ storage: storageAvatar });
const uploadArticleImage = multer({ storage: storageArticles });

app.use(cors());

app.use(express.json());

app.use(appRouter);

// routes for upload users avatars and articles images
app.use('/src/uploads', express.static('src/uploads'));

app.post('/upload/avatars', uploadAvatar.single('image'), (req, res) => {
  console.log(req.file);
  res.json({
    url: `/uploads/avatars/${req.file.originalname}`,
  });
});

app.post('/upload/articles', uploadArticleImage.single('image'), (req, res) => {
  console.log(req.file);
  res.json({
    url: `/uploads/articles/${req.file.originalname}`,
  });
});

module.exports = { app };
