const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

const { storageAvatar, storageArticles } = require('./storage');

const { appRouter } = require('./routes/app.router');

const app = express();

const uploadAvatar = multer({ storage: storageAvatar });
const uploadArticleImage = multer({ storage: storageArticles });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(appRouter);

// routes for upload users avatars and articles images
app.use('/src/uploads', express.static('src/uploads'));

app.post('/upload/avatars/:id', uploadAvatar.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.file.mimetype, 'mimetype');

  res.json({
    url: `/uploads/avatars/${req.file.originalname}`,
  });
});

app.post('/upload/articles', uploadArticleImage.single('image'), (req, res) => {
  console.log(req.file.mimetype, 'mimetype');
  res.json({
    url: `/uploads/articles/${req.file.originalname}`,
  });
});

module.exports = { app };
