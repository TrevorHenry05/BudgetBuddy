import React from "react";
import axios from "axios";

import { API_URL } from "../constants";

const MemberList = ({ members, setShowModal, groupId, setGroup }) => {
  const handleDeleteMember = async (memberId) => {
    const token = localStorage.getItem("token");
    const fetchGroupData = async (token) => {
      const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroup(response.data);
    };
    try {
      await axios.delete(
        `${API_URL}/api/groups/${groupId}/members/${memberId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGroupData(token);
    } catch (error) {
      console.error(`Failed to delete member with ID: ${memberId}`, error);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        width: "90%",
        margin: "auto",
      }}
    >
      <div className="d-flex justify-content-between mb-2">
        <h3 className="mb-0">Members</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Member
        </button>
      </div>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <ul className="list-group">
          {members.map((member) => (
            <li
              key={member._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {member.username}
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteMember(member._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberList;
