import React from "react";
import { useAuth } from "../context/authContextt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/practise/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(detail),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.token, data.user);
        navigate("/");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4 min-w-screen">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-indigo-100 opacity-80">
            Please enter your details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={detail.email}
              onChange={(e) => setDetail({ ...detail, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="hello@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              value={detail.password}
              onChange={(e) =>
                setDetail({ ...detail, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 flex justify-between text-sm text-black">
          <a href="#" className="hover:text-white transition-colors">
            Forgot Password?
          </a>
          <a
            href="/Register"
            className="hover:text-white transition-colors font-semibold"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
