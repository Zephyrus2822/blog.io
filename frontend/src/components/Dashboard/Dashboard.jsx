import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    // Fetch users, blogs, and activity logs from the backend
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data));

    fetch('/api/activity-logs')
      .then((res) => res.json())
      .then((data) => setActivityLogs(data));
  }, []);

  const deleteUser = (userId) => {
    // Delete user API call
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter((user) => user.id !== userId)));
  };

  const deleteBlog = (blogId) => {
    // Delete blog API call
    fetch(`/api/blogs/${blogId}`, { method: 'DELETE' })
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== blogId)));
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Blogs</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              {blog.title}
              <button onClick={() => deleteBlog(blog.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Activity Logs</h2>
        <ul>
          {activityLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
