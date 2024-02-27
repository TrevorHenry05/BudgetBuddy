import React from "react";
import { useNavigate } from "react-router-dom";

const BudgetList = ({ budgets, setShowModal, displayUser = false }) => {
  const navigate = useNavigate();

  const handleNavigate = (budgetId) => {
    navigate(`/budgets/${budgetId}`);
  };

  const handleCreateBudget = () => {
    setShowModal(true);
  };

  return (
    <div
      className="card"
      style={{
        width: "80%",
        margin: "auto",
        overflow: "hidden",
        minHeight: "356px",
      }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        Budgets
        <button className="btn btn-primary" onClick={handleCreateBudget}>
          Create Budget
        </button>
      </div>
      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {budgets.length === 0 ? (
          <div>No Budgets Available</div>
        ) : (
          <div className="list-group">
            {budgets.map((budget) => (
              <button
                key={budget._id}
                type="button"
                className="list-group-item list-group-item-action"
                onClick={() => handleNavigate(budget._id)}
              >
                <div className="fw-bold">{budget.purpose}</div>
                <div>Total Budget: ${budget.totalBudget}</div>
                <div>
                  Start Date: {new Date(budget.startDate).toLocaleDateString()}
                </div>
                <div>
                  End Date: {new Date(budget.endDate).toLocaleDateString()}
                </div>
                {displayUser ? (
                  budget.user ? (
                    <div>User: {budget.user.username}</div>
                  ) : (
                    <div>No User </div>
                  )
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetList;
