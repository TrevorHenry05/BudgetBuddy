import React from "react";
import { useNavigate } from "react-router-dom";

const GroupOverview = ({ groups }) => {
  const navigate = useNavigate();

  const handleNavigate = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div
      className="card"
      style={{ width: "80%", margin: "auto", overflow: "hidden" }}
    >
      <div className="card-header"></div>
      <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
        <div className="list-group">
          {groups.map((group) => (
            <button
              key={group._id}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => handleNavigate(group._id)}
            >
              {group.groupName} - {group.members.length} Members
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupOverview;
