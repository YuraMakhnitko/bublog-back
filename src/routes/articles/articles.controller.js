const fs = require('fs');
const articles = require('../../models/articles.mongo');
const comment = require('../../models/comments.mongo');
// const users = require('../../models/users.mongo');

const getUserImg = (items) => {
  items.forEach((item) => {
    if (item.user.avatarUrl) {
      fs.writeFileSync(
        item.user.imgAvatarUrl,
        item.user.imgAvatar.data,
        item.user.imgAvatar.contentType
      );
    }
  });
};

const getArticlesImg = (items) => {
  items.forEach((item) => {
    if (item.articleImgUrl) {
      fs.writeFileSync(
        item.imgArticleUrl,
        item.imgArticle.data,
        item.imgArticle.contentType
      );
    }
  });
};

const getArticlesByCategory = async (req, res) => {
  try {
    if (Number(req.body.categoryId) === 1) {
      const allArticles = await articles
        .find({}, { __v: 0 })
        .sort('-createdAt')
        .populate('user');

      const latest = allArticles.slice(0, 12);
      getUserImg(latest);
      getArticlesImg(latest);

      return res.status(200).json(latest);
    }
    if (Number(req.body.categoryId) === 0) {
      const allArticles = await articles
        .find({}, { __v: 0 })
        .sort('-createdAt')
        .populate('user');
      getUserImg(allArticles);
      getArticlesImg(allArticles);

      return res.status(200).json(allArticles);
    }
    const articlesByCategoryId = await articles
      .find({ category: req.body.categoryId }, { __v: 0 })
      .sort('-createdAt')
      .populate('user');
    getUserImg(articlesByCategoryId);
    getArticlesImg(articlesByCategoryId);

    return res.status(200).json(articlesByCategoryId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t find articles!',
    });
  }
};

const getOneArticle = async (req, res) => {
  try {
    const articleId = req.params.articleId;

    const comments = await comment
      .find({ article: articleId })
      .sort('-createdAt')
      .populate('user');

    const article = await articles
      .findOneAndUpdate(
        {
          _id: articleId,
        },
        {
          $inc: {
            vievCount: 1,
          },
        },
        { returnDocument: 'after' }
      )
      .populate('user');
    if (article.articleImgUrl) {
      fs.writeFileSync(
        article.imgArticleUrl,
        article.imgArticle.data,
        article.imgArticle.contentType
      );
    }

    getUserImg(comments);

    const articleWithcomments = { comments, ...article._doc };

    res.status(200).json(articleWithcomments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t find article!',
    });
  }
};

const createArticle = async (req, res) => {
  try {
    const imgType = req.params.imgType;
    const pathImg = req.body.imgArticleUrl;
    const img = fs.readFileSync(pathImg);
    const encode_img = img.toString('base64');

    const doc = new articles({
      category: req.body.categoryId,
      title: req.body.title,
      articleText: req.body.articleText,
      articleImgUrl: req.body.articleImgUrl,
      imgArticleUrl: req.body.imgArticleUrl,
      imgArticle: {
        data: Buffer.from(encode_img, 'base64'),
        contentType: imgType,
      },
      user: req.userId,
    });

    const article = await doc.save();
    res.json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t create article',
    });
  }
};

const removeArticle = async (req, res) => {
  try {
    const id = req.params.articleId;

    await comment
      .deleteMany({
        article: id,
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Can`t remove article!',
        });
      });
    await articles.findByIdAndDelete({ _id: id }).catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Can`t remove article!',
      });
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Can`t get article!',
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const imgType = req.params.imgType;
    const pathImg = req.body.imgArticleUrl;
    const img = fs.readFileSync(pathImg);
    const encode_img = img.toString('base64');

    const id = req.params.articleId;
    await articles.updateOne(
      {
        _id: id,
      },
      {
        category: req.body.categoryId,
        title: req.body.title,
        articleText: req.body.articleText,
        imgArticleUrl: req.body.imgArticleUrl,
        imgArticle: {
          data: Buffer.from(encode_img, 'base64'),
          contentType: imgType,
        },
        articleImgUrl: req.body.articleImgUrl,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t update article!',
    });
  }
};

const searchArticles = async (req, res) => {
  try {
    const searchValue = req.params.value;
    const allArticles = await articles.find().populate('user');
    const searchedArticles = await allArticles.filter((article) => {
      return article.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    return res.status(200).json(searchedArticles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Can`t find articles!',
    });
  }
};

module.exports = {
  createArticle,
  getArticlesByCategory,
  getOneArticle,
  removeArticle,
  updateArticle,
  searchArticles,
};
