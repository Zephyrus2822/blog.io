import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FiClock, FiUser } from "react-icons/fi";

Modal.setAppElement("#root");

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/posts");
      setPosts(res.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!title || !content) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5001/api/posts",
        {
          title,
          body: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setModalIsOpen(false);
      setTitle("");
      setContent("");
      fetchPosts(); // refresh
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 pt-28 pb-32 relative">
      <div className="container mx-auto">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Blog Posts
        </motion.h1>

        {/* Posts */}
        <motion.div
          className="flex flex-col gap-6 px-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {posts.length > 0 ? (
            posts
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post, index) => (
                <motion.div
                  key={post._id || index}
                  className="bg-white rounded-xl shadow-md p-6 h-52 flex flex-col justify-between border border-blue-100 transition hover:shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link to={`/posts/${post._id}`}>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm flex-grow overflow-hidden line-clamp-3">
                    {post.body?.slice(0, 200)}...
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FiUser className="text-blue-500" />
                      {post.author?.name || "Unknown"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))
          ) : (
            <motion.div
              className="text-center text-gray-500 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No blog posts found. Be the first to create one!
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Fixed Editor Prompt */}
      <div
        onClick={() => setModalIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white shadow-lg border border-blue-300 hover:border-blue-500 text-gray-500 px-6 py-4 rounded-xl cursor-text transition hover:shadow-2xl"
      >
        ✍️ Click here to write a new blog post...
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-2xl w-full mx-auto mt-28 bg-white p-8 rounded-xl shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black/30 flex items-start justify-center z-50"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create New Blog Post
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your content here..."
          className="w-full h-48 border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:border-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition relative"
          >
            {loading ? (
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden absolute bottom-0 left-0">
                <div className="w-full h-full bg-white animate-pulse" />
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlogPage;
