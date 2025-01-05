const mongoose = require('mongoose');

mongoose.connect(process.env.connection_url)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });


const bookmark = new mongoose.Schema({
    articleId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    }
});


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
const User = mongoose.model('User', userSchema);

const Bookmark = mongoose.model('Bookmark', bookmark);

module.exports = {
    Bookmark,
    User
}