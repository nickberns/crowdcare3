const mongoose = require('mongoose')

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: {
      timestamp: Number,
      author: String
    },
    author: String,
    title: String,
    content: String,
    url: String,
    tag: String,
    donationacc: String,
    likes: {
      type: Number,
      default: 0
    },
    threshold: {
      type: Number,
      default: 5
    },    postConfirmed: {
      type: Boolean,
      default: false
    }
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

module.exports = Post
