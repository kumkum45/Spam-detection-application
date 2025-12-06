// src/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// --- Predict Spam/Phishing ---
export async function predictMessage(message) {
  const token = localStorage.getItem("access_token"); // Get token from localStorage
  if (!token) throw new Error("Not authenticated. Please login first.");

  try {
    const response = await fetch(`${API_BASE_URL}/spam-check`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || `Server error: ${response.status}`);
    }

    return await response.json(); // {is_spam, spam_confidence, is_phishing, phishing_confidence, stored}
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// --- Fetch User Activity ---
// --- Fetch User Activity ---
// --- Fetch User Activity ---
export async function getUserActivity() {
  const token = localStorage.getItem("access_token");
  let userId = localStorage.getItem("user_id");

  console.log("DEBUG getUserActivity: token =", !!token, "userId =", userId);

  if (!token) {
    throw new Error("Not authenticated. Please login first.");
  }

  if (!userId || userId === "undefined" || userId === "null") {
    console.log("DEBUG: userId missing, fetching from token...");
    try {
      const userInfo = await getUserFromToken();
      userId = userInfo.user_id;
      if (!userId) throw new Error("Failed to determine user id from token");
      localStorage.setItem("user_id", String(userId));
      console.log("DEBUG: Got userId from token:", userId);
    } catch (err) {
      console.error("Failed to get userId from token:", err);
      throw err;
    }
  }

  userId = parseInt(userId, 10);
  if (Number.isNaN(userId)) throw new Error("Invalid user_id in localStorage");

  try {
    const url = `${API_BASE_URL}/user/activity?user_id=${userId}`;
    console.log("DEBUG: Fetching from URL:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("DEBUG: Response status:", response.status);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error("DEBUG: Backend error:", data);
      throw new Error(data.detail || `Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log("DEBUG: Got data:", result);
    return result;
  } catch (error) {
    console.error("API Error (getUserActivity):", error);
    throw error;
  }
}

// Submit a new spam report
export async function submitReport(report) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Not authenticated. Please login.");

  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      message,
      category,
      source,
      user_id: userId,  // 👈 send logged-in user's ID
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to submit report");
  }
  return await response.json();
}

export async function getReportStats() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Not authenticated. Please login.");

  const response = await fetch(`${API_BASE_URL}/reports/stats`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to fetch report stats");
  }
  return await response.json();
}


export async function getUserFromToken() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Not authenticated. Please login first.");

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || `Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}