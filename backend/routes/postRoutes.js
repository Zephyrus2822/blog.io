import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  createComment,
  // fetchComment
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getDashboardMetrics } from '../controllers/dashboardController.js';

const router = express.Router();
router.get("/dashboard", protect, getDashboardMetrics);
// Public
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, toggleLike);
router.post('/:id/comments', protect, createComment);



export default router;
