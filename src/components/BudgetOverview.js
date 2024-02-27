import React from "react";
import { useNavigate } from "react-router-dom";

const BudgetOverview = ({ budgets }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="card"
      style={{
        width: "80%",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <div className="card-header"></div>
      <div className="card-body" style={{ height: "300px", overflowY: "auto" }}>
        <div className="list-group">
          {budgets.map((budget) => (
            <button
              key={budget.id}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/budgets/${budget.id}`)}
            >
              Purpose: {budget.purpose} <br />
              Start Date: {formatDate(budget.startDate)} <br />
              End Date: {formatDate(budget.endDate)} <br />
              User: {budget.user ? budget.user.username : "N/A"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
