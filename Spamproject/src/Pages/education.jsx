import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Education() {
  const [activeSection, setActiveSection] = useState("redflags");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const heroVideos = [
    "/src/images/spam1.mp4",
    "/src/images/spam4.mp4"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === heroVideos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(timer);
  }, [heroVideos.length]);

  const redFlags = [
    {
      icon: "⏰",
      title: "Urgent Pressure",
      description: "Act now or lose access.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "🔐",
      title: "Requests for Private Info",
      description: "Passwords, PINs, codes.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "🔗",
      title: "Strange Links or Files",
      description: "Unexpected attachments or websites.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: "🎁",
      title: "Too Good to Be True",
      description: "Free money, prizes, or deals.",
      color: "from-green-500 to-green-600"
    }
  ];

  const howScamsWork = [
    {
      title: "Creating Fear or Urgency",
      description: "Your account is locked",
      icon: "⚠️",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Offering Unrealistic Rewards",
      description: "You won a prize",
      icon: "🎯",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const safetyToolkit = [
    {
      title: "Verify the Sender",
      description: "Before responding to any message, email, or phone call. If something feels unusual, double-check using official contact details.",
      icon: "✅",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Avoid Unknown Links",
      description: "Don't click on unknown links or attachments. These often lead to fake websites or install harmful software.",
      icon: "🚫",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Use Strong Passwords",
      description: "Create strong, unique passwords for your accounts and enable two-factor authentication wherever possible for extra security.",
      icon: "🔒",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Report Suspicious Activity",
      description: "Report suspicious messages to your bank, email provider, or a trusted authority. Reporting helps stop scammers from targeting others.",
      icon: "📢",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const realVsFake = {
    fake: {
      title: "Scam Messages",
      characteristics: [
        "Create urgency",
        "Use poor spelling and grammar",
        "Include suspicious links that don't match official websites"
      ],
      color: "from-red-500 to-red-600"
    },
    real: {
      title: "Legitimate Messages",
      characteristics: [
        "Come from verified email addresses",
        "Use professional language",
        "Never pressure you into acting immediately"
      ],
      color: "from-green-500 to-green-600"
    }
  };

  const reportingPortals = [
    {
      name: "National Cyber Crime Reporting Portal",
      description: "For reporting cybercrime, online fraud, phishing, and scams.",
      website: "https://cybercrime.gov.in",
      icon: "🛡️",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Ministry of Consumer Affairs – National Consumer Helpline (NCH)",
      description: "For complaints about consumer fraud, misleading services, and scams.",
      website: "https://consumerhelpline.gov.in",
      phone: "1800-11-4000 or 14404",
      sms: "8130009809",
      icon: "📞",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Reserve Bank of India (RBI) – Beware of Fictitious Offers",
      description: "For awareness about banking/financial frauds.",
      website: "https://www.rbi.org.in/commonman/English/Scripts/FAQView.aspx?Id=744",
      icon: "🏦",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Indian Computer Emergency Response Team (CERT-In)",
      description: "Government body handling cyber threats, phishing, and online frauds.",
      website: "https://www.cert-in.org.in",
      icon: "🔒",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Video Carousel */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Video Background Carousel */}
        <div className="absolute inset-0 z-0">
          {heroVideos.map((video, index) => (
            <video
              key={index}
              className={`absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-1000 ${
                index === currentVideoIndex ? 'opacity-20' : 'opacity-0'
              }`}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Stay Safe from Scams
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Learn how to spot red flags and protect yourself from online threats
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-50 transition-colors"
            >
              Start Learning
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* The Spam Playbook Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  The Spam Playbook
                </h2>
                <p className="text-xl text-gray-600">
                  Understanding how scammers operate helps you stay one step ahead
                </p>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                  <p className="text-lg text-gray-700 mb-6">
                    Scams are tricks used to steal your money or personal details. Scammers often pretend to be banks, companies, or friends to make you trust them.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {howScamsWork.map((method, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl mb-4`}>
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-gray-600">"{method.description}"</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <span className="text-red-400 text-xl">⚠️</span>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-red-800">Why it matters:</h3>
                        <p className="text-red-700">
                          Scams can cost you money, privacy, and peace of mind. Knowing how they work makes it easier to spot and avoid them.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Spot the Red Flags Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Spot the Red Flags
                </h2>
                <p className="text-xl text-gray-600">
                  Scammers leave clues. Watch out for these warning signs:
                </p>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {redFlags.map((flag, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100"
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${flag.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                        {flag.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{flag.title}</h3>
                      <p className="text-gray-600 text-sm">"{flag.description}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Your Safety Toolkit Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Your Safety Toolkit
                </h2>
                <p className="text-xl text-gray-600">
                  Protecting yourself from scams is easier when you follow a few simple practices:
                </p>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safetyToolkit.map((tool, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center text-2xl mr-4 flex-shrink-0`}>
                          {tool.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                          <p className="text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Real vs Fake Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Real vs Fake
                </h2>
                <p className="text-xl text-gray-600">
                  Learn to distinguish between legitimate messages and scam attempts
                </p>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${realVsFake.fake.color} flex items-center justify-center text-xl mr-3`}>
                        ❌
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{realVsFake.fake.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {realVsFake.fake.characteristics.map((characteristic, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{characteristic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${realVsFake.real.color} flex items-center justify-center text-xl mr-3`}>
                        ✅
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{realVsFake.real.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {realVsFake.real.characteristics.map((characteristic, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 text-sm">{characteristic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Portals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="lg:col-span-1 flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Report Scams & Get Help
                </h2>
                <p className="text-xl text-gray-600">
                  If you encounter a scam, report it to the appropriate authorities
                </p>
              </motion.div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reportingPortals.map((portal, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                    >
                      <div className="flex items-start mb-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${portal.color} flex items-center justify-center text-xl mr-3 flex-shrink-0`}>
                          {portal.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{portal.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{portal.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-2 text-sm mt-0.5">🌐</span>
                          <a 
                            href={portal.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                          >
                            {portal.website}
                          </a>
                        </div>
                        {portal.phone && (
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2 text-sm">📞</span>
                            <span className="text-gray-700 text-sm">{portal.phone}</span>
                          </div>
                        )}
                        {portal.sms && (
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2 text-sm">💬</span>
                            <span className="text-gray-700 text-sm">SMS: {portal.sms}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Protected with AI
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our AI-powered system provides real-time protection against evolving scam threats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-50 transition-colors"
            >
              Try Our Tool
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Report a Scam
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Phistrap</h3>
              <p className="text-gray-400">
                AI-powered scam detection and prevention for a safer digital world.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Education</a></li>
                <li><a href="#" className="hover:text-white transition">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition">Report Scam</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Phistrap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
