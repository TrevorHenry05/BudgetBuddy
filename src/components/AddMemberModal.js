import React, { useState } from "react";

import axios from "axios";
import { API_URL } from "../constants";

function AddMemberModal({
  show,
  users,
  groupMembers,
  handleClose,
  setGroup,
  groupId,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term and exclude already in group
  const filteredMembers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !groupMembers.includes(user._id)
  );

  const handleSelectUser = (user) => {
    if (selectedUsers.find((selected) => selected._id === user._id)) {
      setSelectedUsers(
        selectedUsers.filter((selected) => selected._id !== user._id)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleAddMember = async (member) => {
    const token = localStorage.getItem("token");
    const fetchGroupData = async (token) => {
      const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroup(response.data);
    };
    try {
      await axios.post(
        `${API_URL}/api/groups/${groupId}/members`,
        { memberId: member._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGroupData(token);
    } catch (error) {
      console.error(`Failed to add member with ID: ${member._id}`, error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length) {
      selectedUsers.forEach((user) => handleAddMember(user));
      setSelectedUsers([]);
      setSearchTerm("");
      handleClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Member</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setSelectedUsers([]);
                setSearchTerm("");
                handleClose();
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by username"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="user-list"
                style={{
                  overflowY: "auto",
                  height: "200px",
                  padding: "0 15px",
                }}
              >
                {filteredMembers.map((user) => (
                  <div key={user._id} className="user-item">
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      className="user-checkbox"
                      checked={selectedUsers.some(
                        (selected) => selected._id === user._id
                      )}
                      onChange={() => handleSelectUser(user)}
                    />
                    <label htmlFor={`user-${user._id}`} className="user-label">
                      {user.username} ({user.email})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedUsers([]);
                  setSearchTerm("");
                  handleClose();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
