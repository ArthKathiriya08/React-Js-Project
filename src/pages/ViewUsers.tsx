import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";

// Component to view, search and delete registered users
function ViewUsers() {
  // Search query state
  const [search, setSearch] = useState("");

  // Retrieve and maintain users list in state
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const data = localStorage.getItem("users");
      return data ? (JSON.parse(data) as User[]) : [];
    } catch {
      return [];
    }
  });

  // State for delete confirmation modal
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Filter users based on search keyword (name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Open delete modal for a specific user
  const handleOpenDeleteModal = (user: User) => {
    setUserToDelete(user);
    setPasswordInput("");
    setDeleteError("");
    setShowPassword(false);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setPasswordInput("");
    setDeleteError("");
    setShowPassword(false);
  };

  // Handle delete confirmation after password verification
  const handleConfirmDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userToDelete) return;

    // Check possible password property variations
    const userRecord = userToDelete as unknown as Record<string, unknown>;
    const rawSavedPassword =
      userRecord.password ??
      userRecord.Password ??
      userRecord.pass ??
      userRecord.pwd ??
      "";

    const saved = String(rawSavedPassword).trim();
    const entered = passwordInput.trim();

    console.log("Delete verification:", {
      entered,
      saved,
      userToDelete,
    });

    // If no password saved on user or matches exact / trimmed / case-insensitive
    const isMatched =
      !saved ||
      entered === saved ||
      passwordInput === String(rawSavedPassword) ||
      entered.toLowerCase() === saved.toLowerCase();

    if (!isMatched) {
      setDeleteError("Incorrect password! Cannot delete user.");
      return;
    }

    // Delete user from localStorage and state
    const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // Close modal
    handleCloseDeleteModal();
  };

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
                  <div className="user-item-header">
                    <h3>{user.name}</h3>
                    <button
                      type="button"
                      className="delete-icon-btn"
                      onClick={() => handleOpenDeleteModal(user)}
                      title={`Delete ${user.name}`}
                      aria-label={`Delete ${user.name}`}
                    >
                      Delete
                    </button>
                  </div>

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

      {/* Delete Password Confirmation Modal */}
      {userToDelete && (
        <div className="modal-overlay" onClick={handleCloseDeleteModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title">Confirm Deletion</h2>
            <p className="modal-desc">
              Please enter the password for <strong>{userToDelete.name}</strong> (
              {userToDelete.email}) to confirm deletion.
            </p>

            <form onSubmit={handleConfirmDelete}>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter user's password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setDeleteError("");
                  }}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {deleteError && <p className="error">{deleteError}</p>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
                <button type="submit" className="danger-btn">
                  Delete User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default ViewUsers;