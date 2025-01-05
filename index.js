const express = require('express');
const app = express();
const PORT = 4000;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const { Bookmark, User } = require('./db/db');


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());



app.post(`/api/bookmarks`, async (req, res) => {
  try {
    const { articleId, title, content, author, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBookmark = new Bookmark({
      userId: user._id,
      articleId,
      title,
      content,
      author,
    });

    const savedBookmark = await newBookmark.save();

    res.status(201).json({ message: 'Bookmark saved successfully', data: savedBookmark });
  } catch (error) {
    res.status(500).json({ message: 'Error saving bookmark', error: error.message });
  }
});

app.delete(`/api/bookmarks/:id`, async (req, res) => {
    try {
        const { id } = req.params; 

        const user = await User.findOne({ email: "praveen.chastaa@gmail.com" });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedBookmark = await Bookmark.findOneAndDelete({
            articleId: id,

        });

        if (!deletedBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing bookmark', error: error.message });
    }
});
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

