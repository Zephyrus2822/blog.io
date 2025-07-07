import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getDashboardMetrics = async (req, res) => {
    console.log("📊 Dashboard endpoint hit:", req.method, req.originalUrl);
  console.log("Auth user:", req.user);
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      console.log("❌ No user ID found in req.user:", req.user);
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    // Fetch all posts authored by the user
    const posts = await Post.find({ author: userId });

    const postsCount = posts.length;

    // Sum of all likes received across all of the user's posts
    const likesReceived = posts.reduce(
      (sum, post) => sum + (Array.isArray(post.likes) ? post.likes.length : 0),
      0
    );

    // Count of all comments made by the user
    const commentsCount = await Comment.countDocuments({ author: userId });

    // Timeline of number of posts created each day over the last 7 days
    const timeline = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const start = new Date(day.setHours(0, 0, 0, 0));
      const end = new Date(day.setHours(23, 59, 59, 999));

      const count = await Post.countDocuments({
        author: userId,
        createdAt: { $gte: start, $lte: end },
      });

      timeline.push({
        date: start.toISOString().slice(0, 10), // Format: YYYY-MM-DD
        count,
      });
    }

    // Return dashboard metrics
    res.json({
      postsCount,
      likesReceived,
      commentsCount,
      likesTimeline: timeline,
    });
  } catch (err) {
    console.error("🔥 Dashboard controller error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
