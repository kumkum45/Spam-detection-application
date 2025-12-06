import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [data, setData] = useState({
    total_scans: 120,
    spam_detected: 45,
    safe_messages: 75,
    accuracy: 87,
    recent_activity: [
      { message: "Congratulations! You've won a prize", status: "spam", time: "2025-09-13T12:30:00Z" },
      { message: "Meeting at 3 PM today", status: "safe", time: "2025-09-13T11:15:00Z" },
      { message: "Your account has been compromised", status: "spam", time: "2025-09-12T18:45:00Z" },
      { message: "Dinner at 8?", status: "safe", time: "2025-09-12T17:00:00Z" },
    ],
  });

  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // small delay to simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your spam detection activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Scans" value={data.total_scans} iconColor="blue" />
          <StatCard title="Spam Detected" value={data.spam_detected} iconColor="red" />
          <StatCard title="Safe Messages" value={data.safe_messages} iconColor="green" />
          <StatCard title="Accuracy" value={`${data.accuracy}%`} iconColor="yellow" />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {data.recent_activity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${item.status === "spam" ? "bg-red-500" : "bg-green-500"}`}
                  ></div>
                  <p className="text-gray-700 break-words">{item.message}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(item.time).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, iconColor }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
      <div className={`p-3 rounded-lg ${colors[iconColor]}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
