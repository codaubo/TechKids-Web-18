const express = require('express');
const postModel = require('./model');

const postRouter = express.Router();

postRouter.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.findById(postId).exec();
    res.status(200).json(post);
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

// http://localhost:3000/api/posts?after=823768hdausahd&pageSize=10
postRouter.get('/', async (req, res) => {
  try {
    const after = req.query.after;
    const pageSize = Number(req.query.pageSize);

    const filter = {};
    if (after) {
      filter._id = {$lt: after};
    }
    const data = await postModel.find(filter)
      .sort({_id: -1})
      .limit(pageSize + 1)
      .populate('author', '_id username fullName createdAt')
      .exec();

    res.status(200).json({
      data: data.length > pageSize ? data.slice(0, pageSize) :data,
      after: data.length > pageSize ? data[pageSize - 1]._id : undefined,
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

postRouter.post('/', async (req, res) => {  
  try {
    if (req.session.authUser) {
      const postInfo = req.body;
      const newPost = new postModel(postInfo);
      await newPost.save();

      res.status(201).json({
        id: newPost._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Please login',
      });
    }
  } catch (error) {
    res.status(error.status || 500).end(error.message || 'Internal server error');
  }
});

module.exports = postRouter;