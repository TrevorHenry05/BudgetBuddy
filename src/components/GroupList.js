import React from "react";
import { useNavigate } from "react-router-dom";

const GroupList = ({ groups, setShowModal }) => {
  const navigate = useNavigate();

  const handleNavigate = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = () => {
    setShowModal(true);
  };

  return (
    <div
      className="card"
      style={{
        width: "80%",
        margin: "auto",
        overflow: "hidden",
        height: "356px",
      }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        Groups
        <button className="btn btn-primary" onClick={handleCreateGroup}>
          Create Group
        </button>
      </div>
      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {groups.length === 0 ? (
          <div>No Groups Available</div>
        ) : (
          <div className="list-group">
            {groups.map((group) => (
              <button
                key={group._id}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => handleNavigate(group._id)}
              >
                {group.groupName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupList;
