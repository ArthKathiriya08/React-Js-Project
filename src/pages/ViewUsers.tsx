import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";

// Component to view and search registered users
function ViewUsers() {
  // Search query state
  const [search, setSearch] = useState("");

  // Retrieve users list from localStorage
  const users: User[] = (() => {
    try {
      const data = localStorage.getItem("users");
      return data ? (JSON.parse(data) as User[]) : [];
    } catch {
      return [];
    }
  })();

  // Filter users based on search keyword (name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <div className="auth-card users-card">
        {/* Left Side Illustration */}
        <div className="illustration">
          <img
            src="/92f2984ebd391d7e8c17a1e3cd673e46-removebg-preview.png"
            alt="Person working on a laptop"
          />
        </div>

        {/* Right Side User List Section */}
        <section className="form-section">
          <h1>User Details</h1>

          {/* User count subtitle */}
          <p className="subtitle">
            Registered Users: {users.length}
          </p>

          {/* Search Input Field */}
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search users"
          />

          {/* Registered Users List */}
          <div className="user-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <article className="user-item" key={user.id}>
                  <h3>{user.name}</h3>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p>
                    <strong>Contact:</strong> {user.contact}
                  </p>

                  <p>
                    <strong>Password:</strong> ••••••••
                  </p>
                </article>
              ))
            ) : (
              <p className="empty">
                {users.length === 0
                  ? "No registered users found."
                  : "No matching users found."}
              </p>
            )}
          </div>

          {/* Back to Registration Button */}
          <Link to="/" className="secondary-btn">
            Back to Registration
          </Link>
        </section>
      </div>
    </main>
  );
}

export default ViewUsers;