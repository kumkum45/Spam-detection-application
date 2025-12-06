import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

// ---------------- Carousel Component ----------------
function ImageCarousel({ images, interval = 3000 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(
      () => setCurrentImageIndex((prev) => (prev + 1) % images.length),
      interval
    );
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full overflow-hidden shadow-lg">
      <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px]">
        {images.map((img, i) => (
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}

// ---------------- Spam Checker Component ----------------
function SpamChecker() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkSpam = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("You must be logged in to check messages!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/spam-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Server error! Please try again.");
        setResult(null);
      } else {
        setResult(data);

        if (data.is_spam) {
          toast.error(
            `🚨 Spam Detected! Confidence: ${(data.spam_confidence * 100).toFixed(1)}%`
          );
        } else if (data.is_phishing) {
          toast.error(
            `⚠️ Phishing Detected! Confidence: ${(data.phishing_confidence * 100).toFixed(1)}%`
          );
        } else {
          toast.success("✅ Message is Safe!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setMessage("");
  };

  return (
    <section id="demo-section" className="pt-0 pb-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Video */}
        <div className="flex justify-center">
          <video
            className="w-full h-[200px] sm:h-[300px] md:h-[350px] object-cover rounded-xl shadow-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/src/images/spam1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right: Spam Checker Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white shadow-lg rounded-xl p-8"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Test Your Messages
              </h2>
              <p className="text-gray-600 mb-4">
                Paste any message below to see our AI in action
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste a message here..."
                className="w-full border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] resize-none"
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

            {/* Result Box */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-lg border-2 ${
                  result.is_spam
                    ? "bg-red-50 border-red-200"
                    : result.is_phishing
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        result.is_spam
                          ? "bg-red-100"
                          : result.is_phishing
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      {result.is_spam ? (
                        <span className="text-red-600 text-2xl">🚨</span>
                      ) : result.is_phishing ? (
                        <span className="text-yellow-600 text-2xl">⚠️</span>
                      ) : (
                        <span className="text-green-600 text-2xl">✅</span>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          result.is_spam
                            ? "text-red-800"
                            : result.is_phishing
                            ? "text-yellow-700"
                            : "text-green-800"
                        }`}
                      >
                        {result.is_spam
                          ? "Spam Detected"
                          : result.is_phishing
                          ? "Phishing Detected"
                          : "Message is Safe"}
                      </h3>
                      <p className="text-sm text-gray-700">
                        Spam Confidence:{" "}
                        {typeof result.spam_confidence === "number"
                          ? Math.round(result.spam_confidence * 100) + "%"
                          : "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Phishing Confidence:{" "}
                        {typeof result.phishing_confidence === "number"
                          ? Math.round(result.phishing_confidence * 100) + "%"
                          : "N/A"}
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
                  <p className="text-gray-700 text-sm break-words">
                    <span className="font-semibold">Message:</span> "{message}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------- Home Page ----------------
export default function Home() {
  const images = [
    { src: "/src/images/home1.jpeg", alt: "Cyber Security" },
    { src: "/src/images/home2.jpeg", alt: "Data Protection" },
    { src: "/src/images/home3.jpeg", alt: "Phishing Threats" },
    { src: "/src/images/home5.jpeg", alt: "Secure Your Info" },
    { src: "/src/images/home4.jpeg", alt: "Spam Awareness" },
  ];

  return (
    <div>
      <Navbar />
      <main>
        <ImageCarousel images={images} />
        <SpamChecker />
        {/* How It Works Section */}
        {/* ... rest remains unchanged */}
      </main>
    </div>
  );
}
