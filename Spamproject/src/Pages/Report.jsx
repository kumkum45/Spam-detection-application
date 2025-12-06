import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Report() {
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [stats, setStats] = useState({
    reportsSubmitted: 42,
    verifiedSpam: 28,
    falsePositives: 5,
    accuracyRate: 85,
  });
  const [recentReports, setRecentReports] = useState([
    {
      message: "You've won $5000! Click to claim now.",
      category: "Lottery/Prize Scam",
      status: "Verified",
    },
    {
      message: "Your bank account will be suspended, verify now.",
      category: "Phishing",
      status: "Verified",
    },
    {
      message: "Let's connect on social media.",
      category: "Other",
      status: "Pending",
    },
    {
      message: "Tech support is calling you for urgent assistance.",
      category: "Tech Support Scam",
      status: "Verified",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Simulate form submission with static data
  async function handleSubmit(e) {
    e.preventDefault();
    if (!message || !category) return alert("Message and category are required");

    setLoading(true);
    try {
      // Add the new report to recentReports statically
      const newReport = {
        message,
        category,
        status: "Pending",
      };
      setRecentReports([newReport, ...recentReports]);
      setStats({
        ...stats,
        reportsSubmitted: stats.reportsSubmitted + 1,
      });
      setMessage("");
      setSource("");
      setCategory("");
      alert("Report submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit report");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-gray-900 mt-3">Report Spam</h1>
          <p className="text-gray-600 mt-2">
            Help us improve our detection by reporting spam messages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Report New Spam</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Spam Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste the spam message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Source (Optional)
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Email, SMS, Social Media, etc."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select category...</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Financial Scam">Financial Scam</option>
                  <option value="Lottery/Prize Scam">Lottery/Prize Scam</option>
                  <option value="Romance Scam">Romance Scam</option>
                  <option value="Tech Support Scam">Tech Support Scam</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:opacity-90 transition"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>

          {/* Statistics & Recent Reports */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Report Statistics</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                <span className="text-gray-700">Reports Submitted</span>
                <span className="font-bold text-gray-900">{stats.reportsSubmitted}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                <span className="text-gray-700">Verified Spam</span>
                <span className="font-bold text-gray-900">{stats.verifiedSpam}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                <span className="text-gray-700">False Positives</span>
                <span className="font-bold text-gray-900">{stats.falsePositives}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg">
                <span className="text-gray-700">Accuracy Rate</span>
                <span className="font-bold text-green-600">{stats.accuracyRate}%</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Reports</h3>
              <div className="space-y-2">
                {recentReports.map((report, index) => (
                  <div key={index} className="p-3 bg-gray-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1 break-words relative top-4">
                      {report.message}
                    </p>
                    <div className="flex justify-between items-center relative bottom-2 gap-1">
                      <span className="text-xs text-gray-500">{report.category}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          report.status === "Verified"
                            ? "bg-red-200 text-red-700"
                            : "bg-yellow-200 text-yellow-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
