import React from "react";

const UserOverview = ({ users }) => {
  return (
    <div
      className="card"
      style={{
        width: "80%",
        minWidth: "300px",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <div className="card-header"></div>
      <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
        <div className="list-group">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => {}}
            >
              {user.username} - {user.email}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
