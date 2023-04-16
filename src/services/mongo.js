// MONGO CONNECT

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error, 'ERROR');
});

async function mongoConnect() {
  await mongoose.connect(process.env.MONGODB_URI);
}

async function mongoDisconect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconect,
};
