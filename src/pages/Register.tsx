import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../types";

// User Registration Page Component
function Register() {
  const navigate = useNavigate();

  // Form input state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  // Error message state
  const [error, setError] = useState("");

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submission and save user to localStorage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fetch existing users from localStorage
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Validate unique email address
    if (users.some((user) => user.email === form.email)) {
      setError("Email already registered!");
      return;
    }

    // Create new user object
    const newUser: User = {
      id: Date.now(),
      ...form,
    };

    // Save updated users list to localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Redirect to users list page
    navigate("/users");
  };

  return (
    <main className="page">
      <div className="auth-card">
        {/* Left Side Illustration */}
        <div className="illustration">
          <img
            src="/92f2984ebd391d7e8c17a1e3cd673e46-removebg-preview.png"
            alt="Person working on a laptop"
          />
        </div>

        {/* Right Side Form Section */}
        <section className="form-section">
          <h1>Create Account</h1>
          <p className="subtitle">Join us and unlock your world.</p>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />

            {/* Email Input */}
            <label htmlFor="email">Email ID</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* Password Input */}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />

            {/* Contact Input */}
            <label htmlFor="contact">Contact Number</label>
            <input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter 10-digit number"
              value={form.contact}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title="Enter a 10-digit contact number"
              required
            />

            {/* Error Message Display */}
            {error && <p className="error">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="primary-btn">
              Register
            </button>
          </form>

          {/* Navigation Link to View Users */}
          <Link to="/users" className="secondary-btn">
            View User Data
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Register;