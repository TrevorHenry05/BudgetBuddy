import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const GroupCreationModal = ({ show, handleClose }) => {
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/groups`,
        { groupName: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/groups/${response.data.data._id}`);
    } catch (error) {
      alert("Error creating group. Please try again.", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Group</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="groupName" className="form-label">
                  Group Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationModal;
