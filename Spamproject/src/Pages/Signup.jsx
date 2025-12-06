import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch("http://127.0.0.1:8000/auth/register", {


        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.detail || "Error during signup");
      } else {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with video */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/src/images/spam4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your existing account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
