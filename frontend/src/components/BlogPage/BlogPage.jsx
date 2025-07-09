import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import {
  FiClock,
  FiUser,
  FiHeart,
  FiEdit2,
  FiMessageCircle,
  FiTrash2,
} from "react-icons/fi";

Modal.setAppElement("#root");

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentsMap, setCommentsMap] = useState({});
  const [newComments, setNewComments] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [repliesMap, setRepliesMap] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/posts");
      setPosts(res.data?.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/comments/${postId}`
      );
      setCommentsMap((prev) => ({ ...prev, [postId]: res.data.comments }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5001/api/posts",
        { title, body: content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalIsOpen(false);
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, likes: res.data.likes } : p
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentSubmit = async (postId, parentId = null) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    const payload = { text: commentText };
    if (parentId) payload.parentId = parentId;

    try {
      await axios.post(
        `http://localhost:5001/api/comments/${postId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments(postId);
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Comment error:", err.response?.data || err.message);
    }
  };

  const handleCommentEdit = async (postId, commentId, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    try {
      await axios.put(
        `http://localhost:5001/api/comments/${commentId}`,
        { text: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments(postId);
      setEditingComment(null);
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      await axios.delete(`http://localhost:5001/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments(postId);
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Delete post error:", err);
    }
  };

  const toggleReplies = (commentId) => {
    setRepliesMap((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 px-4 pt-28 pb-32 relative">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Blog Posts
        </motion.h1>

        <motion.div
          className="flex flex-col gap-6 px-4 md:px-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {Array.isArray(posts) &&
            posts
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => {
                const liked =
                  Array.isArray(post.likes) &&
                  user?._id &&
                  post.likes.includes(user?._id);

                return (
                  <motion.div
                    key={post._id}
                    className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col justify-between border border-white/20 hover:border-indigo-300 transition-all"
                    whileHover={{ scale: 1.01 }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <div className="flex justify-between">
                      <Link to={`/posts/${post._id}`}>
                        <h2 className="text-xl font-semibold text-white mb-2">
                          {post.title}
                        </h2>
                      </Link>
                      {post.author?._id === user?._id && (
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="text-sm text-red-400 flex items-center gap-1 hover:text-red-300"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      )}
                    </div>

                    <p className="text-indigo-100 text-sm mb-4 line-clamp-3">
                      {post.body.slice(0, 200)}...
                    </p>

                    <div className="flex justify-between text-sm text-indigo-200 mb-3">
                      <span className="flex items-center gap-1">
                        <FiUser className="text-indigo-300" />
                        {post.author?.name || "Unknown"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-indigo-300" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-6 items-center">
                      <motion.button
                        onClick={() => {
                          if (!isLoggedIn)
                            return alert("Please log in to like a post.");
                          handleLike(post._id);
                        }}
                        className={`flex items-center gap-1 font-medium transition duration-200 ${
                          liked ? "text-pink-400" : "text-indigo-200"
                        }`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiHeart
                          className={`${
                            liked
                              ? "fill-pink-400 text-pink-400"
                              : "text-indigo-200"
                          } transition-colors duration-300`}
                        />
                        {post.likes.length}
                      </motion.button>

                      <button
                        onClick={() => {
                          fetchComments(post._id);
                          setExpandedComments((prev) => ({
                            ...prev,
                            [post._id]: !prev[post._id],
                          }));
                        }}
                        className="text-indigo-200 flex items-center gap-1 hover:text-white"
                      >
                        <FiMessageCircle />
                        Comments
                      </button>
                    </div>

                    {/* Comments */}
                    <AnimatePresence>
                      {expandedComments[post._id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 border-t border-white/20 pt-4"
                        >
                          <div className="space-y-3">
                            {(commentsMap[post._id] || []).map((comment) => (
                              <div key={comment._id} className="ml-2">
                                <div className="text-sm text-indigo-100 flex justify-between items-center">
                                  <span>
                                    <b className="text-white">{comment.author?.name}</b>:{" "}
                                    {editingComment === comment._id ? (
                                      <input
                                        defaultValue={comment.text}
                                        onBlur={(e) =>
                                          handleCommentEdit(
                                            post._id,
                                            comment._id,
                                            e.target.value
                                          )
                                        }
                                        className="ml-2 border border-white/30 bg-white/10 text-white rounded px-2 py-1"
                                      />
                                    ) : (
                                      comment.text
                                    )}
                                  </span>
                                  {comment.author?._id === user?._id && (
                                    <div className="flex gap-2 items-center ml-4">
                                      <button
                                        className="text-xs text-indigo-300 hover:text-white"
                                        onClick={() =>
                                          setEditingComment(comment._id)
                                        }
                                      >
                                        <FiEdit2 />
                                      </button>
                                      <button
                                        className="text-xs text-pink-400 hover:text-pink-300"
                                        onClick={() =>
                                          handleDeleteComment(
                                            comment._id,
                                            post._id
                                          )
                                        }
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* Replies */}
                                {comment.replies?.length > 0 && (
                                  <button
                                    onClick={() => toggleReplies(comment._id)}
                                    className="text-xs text-indigo-300 ml-2 hover:text-white"
                                  >
                                    {repliesMap[comment._id]
                                      ? "Hide Replies"
                                      : "Show Replies"}
                                  </button>
                                )}

                                {repliesMap[comment._id] &&
                                  comment.replies.map((reply) => (
                                    <div
                                      key={reply._id}
                                      className="ml-6 mt-1 text-indigo-200 text-sm border-l border-white/20 pl-2"
                                    >
                                      <b className="text-white">{reply.author?.name}</b>: {reply.text}
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              className="flex-grow border border-white/30 bg-white/10 text-white rounded px-3 py-2 text-sm placeholder-indigo-300"
                              value={newComments[post._id] || ""}
                              onChange={(e) =>
                                setNewComments((prev) => ({
                                  ...prev,
                                  [post._id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              onClick={() => {
                                if (!isLoggedIn)
                                  return alert("Please log in to comment.");
                                handleCommentSubmit(post._id);
                              }}
                              className="bg-indigo-500 text-white px-3 rounded hover:bg-indigo-600 transition"
                            >
                              Post
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
        </motion.div>
      </div>

      {/* New Post Modal Trigger */}
      <motion.div
        onClick={() => setModalIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white/10 backdrop-blur-md shadow-lg border border-indigo-400 hover:border-indigo-300 text-indigo-200 px-6 py-4 rounded-xl cursor-text transition hover:shadow-2xl hover:text-white"
        
      >
        ✍️ Click here to write a new blog post...
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-2xl w-full mx-auto mt-28 bg-gradient-to-br from-purple-800 to-indigo-800 p-8 rounded-xl shadow-2xl outline-none border border-white/20"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Create New Blog Post
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-white/30 bg-white/10 text-white rounded-md px-4 py-2 mb-4 placeholder-indigo-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your content here..."
          className="w-full h-48 border border-white/30 bg-white/10 text-white rounded-md px-4 py-2 resize-none placeholder-indigo-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 border border-white/20"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPage;