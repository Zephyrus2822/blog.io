import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setIsSubmitting(false);
      return setErrorMsg("Passwords do not match.");
    }

    if (password.length < 8) {
      setIsSubmitting(false);
      return setErrorMsg("Password must be at least 8 characters.");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setIsSubmitting(false);
      const msg = err.response?.data?.message || "Registration failed.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex flex-col">
      {/* Header */}
      <header className="bg-transparent">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors duration-300"
            >
              <span className="bg-white text-indigo-800 px-2 py-1 rounded-md mr-1">Blog</span>
              <span className="text-indigo-200">Sphere</span>
            </Link>
            <div>
              <Link
                to="/login"
                className="text-indigo-100 hover:text-white font-medium transition-colors duration-300 flex items-center"
              >
                Sign In <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white mb-2">
                Join Our Community
              </h1>
              <p className="text-indigo-100">
                Start your journey with us today
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 rounded-xl bg-red-400/20 border border-red-400/50 text-red-100 text-sm flex items-center animate-fade-in">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <p className="mt-1 ml-1 text-xs text-indigo-200">
                    Minimum 8 characters
                  </p>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/10"
                    required
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="terms"
                    className="text-sm text-indigo-100"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-white hover:underline">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-white hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl font-medium text-indigo-900 bg-indigo-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${
                    isSubmitting ? "opacity-80" : "shadow-lg hover:shadow-indigo-500/20"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-indigo-100">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-white hover:text-indigo-200 hover:underline transition-colors duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-transparent py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-300">
                Contact
              </a>
            </div>
            <div className="text-indigo-200 text-sm">
              <p>
                &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;