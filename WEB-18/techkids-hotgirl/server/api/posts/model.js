const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  like: {type: Number, default: 0},
  view: {type: Number, default: 0},
  imageUrl: {type: String, require: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;