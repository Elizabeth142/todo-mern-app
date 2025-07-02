import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await fetch(
        "https://todobackend-bi77.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      setAuthLoading(false);

      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setAuthError(data.message || "Login failed");
      }
    } catch (error) {
      setAuthLoading(false);
      setAuthError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-lime-200">
      <div className="max-w-md w-full p-10 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold mb-6 text-center text-green-700">
          Welcome Back
        </h2>

        {authError && (
          <div className="mb-4 text-center text-red-500 font-medium">
            {authError}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(username, password);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-transform duration-300 hover:scale-105"
          >
            {authLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-green-600 hover:underline font-semibold">
              Signup here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
