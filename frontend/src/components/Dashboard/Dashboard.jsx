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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 to-indigo-800">
        <div className="text-indigo-200">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-8">
      <motion.h1
        className="text-3xl font-bold text-white mb-6"
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
            color: "bg-indigo-600",
          },
          {
            label: "Total Likes Received",
            value: metrics.likesReceived,
            color: "bg-pink-600",
          },
          {
            label: "Your Comments",
            value: metrics.commentsCount,
            color: "bg-purple-600",
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            className={`rounded-xl shadow-lg p-6 text-white ${card.color} backdrop-blur-sm bg-opacity-80 border border-white/20`}
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-sm text-indigo-100">{card.label}</div>
            <div className="text-2xl font-semibold">{card.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Likes Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.likesTimeline}>
            <CartesianGrid stroke="#4b5563" strokeDasharray="5 5" />
            <XAxis 
              dataKey="date" 
              stroke="#a5b4fc" 
              tick={{ fill: '#c7d2fe' }}
            />
            <YAxis 
              stroke="#a5b4fc" 
              tick={{ fill: '#c7d2fe' }}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(67, 56, 202, 0.9)',
                borderColor: '#818cf8',
                borderRadius: '0.5rem',
                color: '#e0e7ff'
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#818cf8"
              strokeWidth={3}
              dot={{ 
                r: 4,
                fill: '#6366f1',
                stroke: '#e0e7ff',
                strokeWidth: 2
              }}
              activeDot={{
                r: 6,
                fill: '#a5b4fc',
                stroke: '#4f46e5',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dashboard;