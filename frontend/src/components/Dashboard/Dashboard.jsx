import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/posts/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMetrics(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchMetrics();
  }, [token]);

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Dashboard
      </motion.h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
        {[
          {
            label: "Your Posts",
            value: metrics.postsCount,
            color: "bg-blue-500",
          },
          {
            label: "Total Likes Received",
            value: metrics.likesReceived,
            color: "bg-green-500",
          },
          {
            label: "Your Comments",
            value: metrics.commentsCount,
            color: "bg-yellow-500",
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            className={`rounded-lg shadow-lg p-6 text-white ${card.color}`}
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-sm">{card.label}</div>
            <div className="text-2xl font-semibold">{card.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Likes Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.likesTimeline}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00aaff"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dashboard;
