import { FiEdit, FiUsers, FiTrendingUp, FiBookmark } from "react-icons/fi";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const features = [
    {
      icon: <FiEdit className="w-6 h-6" />,
      title: "Easy Writing",
      description: "Our intuitive editor makes writing effortless.",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "Connect with passionate readers and writers.",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Grow Your Audience",
      description: "Powerful tools to expand your reach.",
    },
    {
      icon: <FiBookmark className="w-6 h-6" />,
      title: "Save Favorites",
      description: "Curate your personal reading list.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-indigo-800">
      {/* Header */}
      <header className="bg-transparent fixed w-full z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors duration-300"
            >
              <span className="bg-white text-indigo-800 px-2 py-1 rounded-md mr-1">
                Blog
              </span>
              <span className="text-indigo-200">Sphere</span>
            </Link>
            <div className="flex space-x-4 items-center">
              {isLoggedIn && user ? (
                <>
                  <span className="text-indigo-100 font-medium hidden md:inline">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/90 text-white rounded-md font-medium hover:bg-red-600 transition shadow-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-indigo-100 rounded-md font-medium hover:bg-white/10 transition hidden sm:inline-flex items-center"
                  >
                    Sign In <FaArrowRight className="ml-1" />
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-indigo-300 text-indigo-900 rounded-md font-medium hover:bg-indigo-200 transition shadow-lg flex items-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-900 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-900 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Where <span className="text-indigo-300">Great Minds</span> Share
            Ideas
          </h1>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of writers and readers on BlogSphere - the platform
            built for meaningful content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={isLoggedIn ? "/blogpage" : "/signup"}
              className="px-8 py-3.5 bg-indigo-300 text-indigo-900 rounded-lg font-semibold text-lg hover:bg-indigo-200 transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              Head to Blogs!
            </Link>
            {/* <Link
              to="/signup"
              className="px-8 py-3.5 border-2 border-indigo-300 text-indigo-100 rounded-lg font-semibold text-lg hover:border-indigo-200 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Start Writing
            </Link> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for <span className="text-indigo-300">Creators</span>
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Everything you need to share your ideas with the world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-8 rounded-xl hover:shadow-lg transition-all cursor-pointer border border-white/20 hover:border-indigo-300 group backdrop-blur-sm"
              >
                <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-indigo-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-indigo-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by <span className="text-indigo-300">Writers</span>
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Join our community of passionate creators
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-400 backdrop-blur-sm">
              <div className="text-yellow-300 mb-4 text-xl">★★★★★</div>
              <p className="text-indigo-100 mb-6 italic">
                "BlogSphere has completely changed how I share my thoughts. The
                interface is so clean and intuitive!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">Sarah Johnson</h4>
                  <p className="text-indigo-300 text-sm">Tech Writer</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-400 backdrop-blur-sm">
              <div className="text-yellow-300 mb-4 text-xl">★★★★★</div>
              <p className="text-indigo-100 mb-6 italic">
                "I've grown my audience by 300% since switching to BlogSphere.
                The community engagement is amazing."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">Michael Chen</h4>
                  <p className="text-indigo-300 text-sm">Travel Blogger</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-indigo-400 backdrop-blur-sm">
              <div className="text-yellow-300 mb-4 text-xl">★★★★☆</div>
              <p className="text-indigo-100 mb-6 italic">
                "As a food blogger, I appreciate the beautiful formatting
                options and engaged readership."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">Priya Patel</h4>
                  <p className="text-indigo-300 text-sm">Food Writer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to share your story?
          </h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            Join thousands of creators who publish their best work on
            BlogSphere.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3.5 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/20"
          >
            Get Started - It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent text-white pt-16 pb-8 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-white text-indigo-800 px-2 py-1 rounded-md mr-1">
                  Blog
                </span>
                <span className="text-indigo-200">Sphere</span>
              </h3>
              <p className="text-indigo-200">
                The modern platform for writers and thinkers to share ideas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    Writing Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="text-indigo-200 hover:text-white transition"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-white transition"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
              <p className="text-indigo-200 mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-indigo-200">
            <p>
              &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
