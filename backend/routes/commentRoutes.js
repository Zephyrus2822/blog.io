import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// CREATE a comment on a blog post
router.post("/:postId/comments", protect, async (req, res) => {
  try {
    console.log("Incoming comment payload:", req.body);
    const { text, parentId } = req.body;
    const { postId } = req.params;

    if (!text || text.trim() === "") {
      console.warn("Empty comment text received.");
      return res.status(400).json({ message: "Comment text is required." });
    }

    const newComment = new Comment({
      post: postId,
      author: req.user.id,
      text,
      parent: parentId || null,
    });

    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    const populatedComment = await newComment.populate("author", "name");

    res.status(201).json({ comment: populatedComment });
  } catch (err) {
    console.error("🔥 Error creating comment:");
    console.error("Message:", err.message);
    console.error("Stack Trace:", err.stack);
    console.error("Full Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET all comments for a blog post (with nested replies)
router.get("/:postId/comments", async (req, res) => {
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
    console.error("🔥 Error fetching comments:");
    console.error("Message:", err.message);
    console.error("Stack Trace:", err.stack);
    console.error("Full Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// EDIT a comment
router.put("/comments/:commentId", protect, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.warn(`Comment with ID ${commentId} not found.`);
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      console.warn(`User ${req.user.id} is not authorized to edit comment ${commentId}.`);
      return res.status(403).json({ message: "Not authorized to edit this comment" });
    }

    comment.text = text;
    await comment.save();

    const updatedComment = await comment.populate("author", "name");

    res.status(200).json({ comment: updatedComment });
  } catch (err) {
    console.error("🔥 Error updating comment:");
    console.error("Message:", err.message);
    console.error("Stack Trace:", err.stack);
    console.error("Full Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a comment
router.delete("/comments/:commentId", protect, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.warn(`Comment with ID ${commentId} not found.`);
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id) {
      console.warn(`User ${req.user.id} is not authorized to delete comment ${commentId}.`);
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.deleteOne({ _id: commentId });
    await Post.updateOne(
      { _id: comment.post },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error("🔥 Error deleting comment:");
    console.error("Message:", err.message);
    console.error("Stack Trace:", err.stack);
    console.error("Full Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
