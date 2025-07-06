import Post from '../models/Post.js';
import mongoose from 'mongoose';
import Comment from '../models/Comment.js';


// @desc Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await Post.create({
      title,
      body,
      author: req.user._id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all posts (optional: search)
export const getPosts = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: 'i' } }
      : {};
    const posts = await Post.find(keyword).populate('author', 'name');
    res.json({posts});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name' },
      })
      .sort({createdAt : -1});
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update post
export const updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.author.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.title = title || post.title;
    post.body = body || post.body;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.author.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const author = req.user._id;
  if (!content) return res.status(400).json({ message: 'Comment required' });
  const comment = await Comment.create({ content, author, post: postId });
  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
  const populated = await comment.populate('author', 'name');
  res.status(201).json(populated);
};

export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const userId = req.user._id;
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const hasLiked = post.likes.includes(userId);
  if (hasLiked) post.likes.pull(userId);
  else post.likes.push(userId);
  await post.save();
  res.json({ likes: post.likes.length, liked: !hasLiked });
};