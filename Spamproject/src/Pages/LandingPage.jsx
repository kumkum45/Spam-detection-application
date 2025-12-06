import Login from "./Login";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const LandingPage = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkSpam = async () => {
    if (!message.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const spamKeywords = [
        "free",
        "win",
        "congratulations",
        "urgent",
        "click here",
        "limited time",
        "act now",
        "guaranteed",
        "no risk",
        "cash prize",
      ];
      const messageLower = message.toLowerCase();
      const isSpam = spamKeywords.some((keyword) =>
        messageLower.includes(keyword)
      );

      setResult({
        isSpam,
        confidence: Math.random() * 0.3 + 0.7,
        message,
      });
      setIsLoading(false);
    }, 1500);
  };

  const clearResult = () => {
    setResult(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">

{/* Fullscreen Background Video Section */}
<section className="relative w-full h-96 overflow-hidden">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full video-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/src/images/Demo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Optional Overlay (to darken video for better text visibility) */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Foreground Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-4xl sm:text-6xl font-bold"
    >
      
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-4 text-lg sm:text-xl max-w-2xl"
    >
      
    </motion.p>
  </div>
</section>



      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-40 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-60 right-1/3 w-14 h-14 bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-35 left-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Spam Detection
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Real-time detection powered by Machine Learning. Protect
                yourself from spam messages with our advanced AI technology.
              </p>

              {/*<motion.button
                onClick={() => {
                  const el = document.getElementById("demo-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg px-8 py-4 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try it now
              </motion.button>*/}
            </motion.div>
          </div>
        </div>
      </section>

        
      {/* Login Section */}
<section className="relative z-10 py-0 bg-white">
  <div className="max-w-4xl mx-auto">
    <Login /> 
  </div>
</section>


      {/* Live Demo Section 
      <section id="demo-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Test Your Messages
            </h2>
            <p className="text-xl text-gray-600">
              Paste any message below to see our AI in action
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message to Check
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste a message here..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] resize-none"
                  rows="4"
                />
              </div>

              <motion.button
                onClick={checkSpam}
                disabled={!message.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg w-full py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Check Spam"
                )}
              </motion.button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-lg border-2 ${
                    result.isSpam
                      ? "bg-red-50 border-red-200"
                      : "bg-green-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          result.isSpam ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        {result.isSpam ? (
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-bold ${
                            result.isSpam ? "text-red-800" : "text-green-800"
                          }`}
                        >
                          {result.isSpam ? "Spam Detected" : "Not Spam"}
                        </h3>
                        <p
                          className={`text-sm ${
                            result.isSpam ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          Confidence: {Math.round(result.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearResult}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Message:</span>{" "}
                      "{result.message}"
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>*/}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Phistrap?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology provides comprehensive spam protection
              with real-time analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                
                title: "Real-time Detection",
                description:
                  "Instant analysis of messages with lightning-fast processing",
                 video: "/src/images/Real-Time Fraud Detection.mp4",
              },
              {
                title: "High Accuracy",
                description:
                  "Advanced machine learning models with 95%+ accuracy rate",
                  video: "/src/images/Accuracy.mp4",
              },
              {
                title: "Privacy First",
                description:
                  "Your messages are processed securely with complete privacy protection",
                  video: "/src/images/Privacy.mp4",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                {/* Video */}
          <video
            className="w-full h-40 object-cover rounded-md mb-4"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={feature.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer className="bg-gray-900 text-gray-400 mt-auto w-full">
        <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Phistrap</h3>
            <p className="text-sm">
              Protecting you from spam with advanced AI detection.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>123 AI Street, Indore, MP, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>support@phistrap.com</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 py-4 text-center text-sm">
          © {new Date().getFullYear()} Phistrap. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
