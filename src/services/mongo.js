// MONGO CONNECT

const mongoose = require('mongoose');

require('dotenv').config();

// const MONGO_URL =
//   'mongodb+srv://YuraM:cosuBkLBv9O6Tsq4@node.qcss5fg.mongodb.net/byblog?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error, 'ERROR');
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGODB_URI);
  // await mongoose.connect(MONGO_URL);
}

async function mongoDisconect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconect,
};
