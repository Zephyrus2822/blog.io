import { FiEdit, FiUsers, FiTrendingUp, FiBookmark } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState("null");

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
      icon: <FiEdit className="w-10 h-10" />,
      title: "Easy Writing",
      description:
        "Our intuitive editor makes writing and formatting your posts a breeze.",
    },
    {
      icon: <FiUsers className="w-10 h-10" />,
      title: "Engage with Community",
      description:
        "Connect with readers and other writers through comments and discussions.",
    },
    {
      icon: <FiTrendingUp className="w-10 h-10" />,
      title: "Grow Your Audience",
      description:
        "Reach more readers with our discovery tools and recommendations.",
    },
    {
      icon: <FiBookmark className="w-10 h-10" />,
      title: "Save Favorites",
      description:
        "Bookmark your favorite posts and come back to them anytime.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 shadow-sm fixed w-full z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <a
              href="#"
              className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-1"
            >
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Blog<span className="text-blue-500">Sphere</span>
            </a>
            <div className="flex space-x-4 items-center">
              {isLoggedIn && user ? (
                <>
                  <span className="text-gray-700 font-medium">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition shadow-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500 hover:text-white transition shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-200 rounded-full opacity-30 blur-2xl -z-10 animate-float2"></div>
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">
              Share Your Thoughts with the World
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join our community of writers and readers. Create, share, and
              discover amazing content on any topic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold text-lg hover:scale-105 transition shadow-xl border-2 border-blue-400 hover:border-indigo-500 flex items-center gap-2 group"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose BlogSphere?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to start sharing your ideas with
                the world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl hover:shadow-2xl transition cursor-pointer border border-blue-100 hover:border-blue-300 group relative overflow-hidden"
                >
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full opacity-20 group-hover:scale-125 transition-transform"></div>
                  <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-400 hover:scale-105 transition-transform">
                <div className="text-yellow-400 mb-4 text-2xl">★★★★★</div>
                <p className="text-gray-600 mb-6 italic">
                  "BlogSphere has completely changed how I share my travel
                  experiences. The interface is so easy to use!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Tanmay Arora
                    </h4>
                    <p className="text-gray-500 text-sm">Travel Blogger</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-indigo-400 hover:scale-105 transition-transform">
                <div className="text-yellow-400 mb-4 text-2xl">★★★★☆</div>
                <p className="text-gray-600 mb-6 italic">
                  "As a tech writer, I appreciate the clean formatting options
                  and the engaged community of readers."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Rudranil Choudhary
                    </h4>
                    <p className="text-gray-500 text-sm">Tech Writer</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-400 hover:scale-105 transition-transform">
                <div className="text-yellow-400 mb-4 text-2xl">★★★★★</div>
                <p className="text-gray-600 mb-6 italic">
                  "I've grown my food blog audience by 300% since switching to
                  BlogSphere. The analytics tools are fantastic."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Prithviraj</h4>
                    <p className="text-gray-500 text-sm">Food Blogger</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-1">
                Blog<span className="text-blue-400">Sphere</span>
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              </h3>
              <p className="text-gray-400">
                The best platform for writers and readers to connect and share
                ideas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Travel
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Food
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Lifestyle
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
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
