import React, { useState } from "react";

export default function SpamCheck() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/spam-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sender_id: "user123@example.com", // 👈 जिस sender से message आया
        }),
      });

      const data = await response.json();
      console.log("[DEBUG] Spam API Response:", data);

      // ✅ If sender is blocked → show alert, stop further action
      if (data.sender_blocked) {
        setError(
          `🚫 Sender is BLOCKED: ${data.blocked_reason || "Suspicious activity"}`
        );
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Spam & Phishing Check</h1>

      <textarea
        className="border p-3 rounded w-full"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleCheck}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Message
      </button>

      {/* 🚨 Show error or block message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* ✅ Show normal result if sender not blocked */}
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <p><b>Spam:</b> {result.is_spam ? "Yes" : "No"}</p>
          <p><b>Spam Confidence:</b> {result.spam_confidence.toFixed(3)}</p>
          <p><b>Phishing:</b> {result.is_phishing ? "Yes" : "No"}</p>
          <p><b>Phishing Confidence:</b> {result.phishing_confidence.toFixed(3)}</p>
        </div>
      )}
    </div>
  );
}


