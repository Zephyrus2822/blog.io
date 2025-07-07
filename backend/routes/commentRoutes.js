import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

/**
 * CREATE comment on a post
 * Endpoint: POST /api/posts/:postId/comments
 */
router.post("/:postId", protect, async (req, res) => {
  try {
    const { text, parentId } = req.body;
    const { postId } = req.params;

    console.log("💬 Incoming comment payload:", req.body);

    if (!text) {
      console.warn("⚠️ Empty comment text received.");
      return res.status(400).json({ message: "Comment required" });
    }

    const newComment = new Comment({
      post: postId,
      author: req.user.id,
      text: text.trim(),
      parent: parentId || null,
    });

    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    const populatedComment = await newComment.populate("author", "name");

    res.status(201).json({ comment: populatedComment });
  } catch (err) {
    console.error("🔥 Error creating comment:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET all comments for a blog post
 * Endpoint: GET /api/posts/:postId/comments
 */
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .lean();

    const commentMap = {};
    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment._id.toString()] = comment;
    });

    const threaded = [];
    comments.forEach((comment) => {
      if (comment.parent) {
        const parent = commentMap[comment.parent.toString()];
        if (parent) parent.replies.push(comment);
      } else {
        threaded.push(comment);
      }
    });

    res.status(200).json({ comments: threaded });
  } catch (err) {
    console.error("🔥 Error fetching comments:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * EDIT comment
 * Endpoint: PUT /api/posts/comments/:commentId
 */
router.put("/:commentId", protect, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text.trim();
    await comment.save();

    const updatedComment = await comment.populate("author", "name");

    res.status(200).json({ comment: updatedComment });
  } catch (err) {
    console.error("🔥 Error updating comment:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * DELETE comment
 * Endpoint: DELETE /api/posts/comments/:commentId
 */
router.delete("/:commentId", protect, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.deleteOne({ _id: commentId });
    await Post.updateOne({ _id: comment.post }, { $pull: { comments: commentId } });

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error("🔥 Error deleting comment:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
