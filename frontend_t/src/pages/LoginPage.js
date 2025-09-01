// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // assuming backend expects email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,       // raw email
        password,    // raw password
      });

      // Save token and redirect
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      // show backend error message
      setError(err.response?.data?.message || "Login failed");
      console.error(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111714] font-sans">
      <div className="w-full max-w-sm p-6 bg-[#1c2620] rounded-xl shadow-lg">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#111714] border border-[#0f6d3d] text-white placeholder-[#9eb7a8] focus:outline-none focus:ring-2 focus:ring-[#38e07b]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#111714] border border-[#0f6d3d] text-white placeholder-[#9eb7a8] focus:outline-none focus:ring-2 focus:ring-[#38e07b]"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#38e07b] text-[#111714] font-bold py-2 rounded-lg hover:bg-[#22ff88] transition duration-300"
          >
            Log In
          </button>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </form>

        <p className="text-[#9eb7a8] text-sm text-center mt-4 underline cursor-pointer">
          Forgot password?
        </p>
      </div>

      <footer className="text-center text-[#9eb7a8] mt-6 text-sm w-full">
        ©2024 Teacher Portal. All rights reserved.
      </footer>
    </div>
  );
}
