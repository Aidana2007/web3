import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Body is required']
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);