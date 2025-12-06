import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getUserActivity, getUserFromToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    total_scans: 0,
    spam_detected: 0,
    safe_messages: 0,
    accuracy: 0,
    recent_activity: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        let userId = localStorage.getItem("user_id");
        
        console.log("DEBUG Dashboard: token =", token);
        console.log("DEBUG Dashboard: userId =", userId);
        
        // If no token, redirect to login
        if (!token) {
          navigate("/login");
          return;
        }

        // If no userId but we have token, try to extract from token or fetch user info
        if (!userId || userId === "undefined") {
          try {
            console.log("DEBUG: No userId, fetching from token...");
            const userInfo = await getUserFromToken();
            userId = userInfo.user_id;
            localStorage.setItem("user_id", userId.toString());
            localStorage.setItem("username", userInfo.username);
            console.log("DEBUG: Got userId from token:", userId);
          } catch (err) {
            console.error("Failed to get user info from token:", err);
            navigate("/login");
            return;
          }
        }

        // Fetch user activity data from backend
        const response = await getUserActivity();
        setData(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600 mb-4">Redirecting to login...</p>
        </div>
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
          {data.recent_activity && data.recent_activity.length > 0 ? (
            <div className="space-y-4">
              {data.recent_activity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${item.status === "spam" || item.status === "phishing" ? "bg-red-500" : "bg-green-500"}`}
                    ></div>
                    <p className="text-gray-700 break-words">{item.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(item.time).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recent activity. Start scanning messages!</p>
          )}
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