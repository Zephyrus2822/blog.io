import { FiEdit, FiUsers, FiTrendingUp, FiBookmark } from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Landing = () => {
  const features = [
    {
      icon: <FiEdit className="w-10 h-10" />,
      title: "Easy Writing",
      description: "Our intuitive editor makes writing and formatting your posts a breeze."
    },
    {
      icon: <FiUsers className="w-10 h-10" />,
      title: "Engage with Community",
      description: "Connect with readers and other writers through comments and discussions."
    },
    {
      icon: <FiTrendingUp className="w-10 h-10" />,
      title: "Grow Your Audience",
      description: "Reach more readers with our discovery tools and recommendations."
    },
    {
      icon: <FiBookmark className="w-10 h-10" />,
      title: "Save Favorites",
      description: "Bookmark your favorite posts and come back to them anytime."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-gray-800">
              Blog<span className="text-blue-500">Sphere</span>
            </a>
            
            
            
            <div className="flex space-x-4">
              <a href="#" className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md font-medium hover:bg-blue-500 hover:text-white transition">
                Sign In
              </a>
              <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition">
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Share Your Thoughts with the World
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join our community of writers and readers. Create, share, and discover amazing content on any topic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#" 
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition shadow-lg"
              >
                Get Started
              </a>
             
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose BlogSphere?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to start sharing your ideas with the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition cursor-pointer"
                >
                  <div className="text-blue-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 mb-6">
                  "BlogSphere has completely changed how I share my travel experiences. The interface is so easy to use!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tanmay Arora</h4>
                    <p className="text-gray-500 text-sm">Travel Blogger</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-yellow-400 mb-4">★★★★☆</div>
                <p className="text-gray-600 mb-6">
                  "As a tech writer, I appreciate the clean formatting options and the engaged community of readers."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rudranil Choudhary</h4>
                    <p className="text-gray-500 text-sm">Tech Writer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 mb-6">
                  "I've grown my food blog audience by 300% since switching to BlogSphere. The analytics tools are fantastic."
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
              <h3 className="text-2xl font-bold mb-4">Blog<span className="text-blue-400">Sphere</span></h3>
              <p className="text-gray-400">
                The best platform for writers and readers to connect and share ideas.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blogs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Technology</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Travel</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Food</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Lifestyle</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
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
            <p>&copy; {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;