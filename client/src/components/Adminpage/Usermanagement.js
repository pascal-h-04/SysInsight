import React, { useState } from "react";
import axios from "axios";

const Usermanagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchUserAndRole = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user/${searchQuery}`
      );
      if (response.data.role) {
        setRole(response.data.role);
        setMessage("");
      } else {
        setRole("");
        setMessage("User not found");
      }
    } catch (error) {
      setRole("");
      setMessage("User not found");
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async () => {
    try {
      await axios.post(`http://localhost:3001/api/user/${searchQuery}/promote`);
      setRole("admin");
      setMessage("User promoted to admin");
    } catch (error) {
      setMessage("User not found");
    }
  };

  const removeAdminRights = async () => { // Corrected function name to removeAdminRights
    try {
      await axios.post(`http://localhost:3001/api/user/${searchQuery}/remove`);
      setRole("user");
      setMessage("Admin rights removed");
    } catch (error) {
      setMessage("User not found");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchUserAndRole();
    } else {
      setMessage("Please enter a username to search");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Management</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for user by username"
              className="form-control"
            />
            <button
              onClick={handleSearch}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
      {role && (
        <div className="row justify-content-center mt-3">
          <div className="col-md-6 text-center">
            <p>
              User role: <strong>{role}</strong>
            </p>
            {role !== "admin" && (
              <button onClick={promoteToAdmin} className="btn btn-success">
                Promote to Admin
              </button>
            )}
            {role === "admin" && (
              <button onClick={removeAdminRights} className="btn btn-danger">
                Remove Admin rights
              </button>
            )}
          </div>
        </div>
      )}
      {message && (
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div
              className={`alert ${role ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermanagement;
