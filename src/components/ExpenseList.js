import React from "react";
import { useNavigate } from "react-router-dom";

const ExpensesList = ({ expenses, isGroup = false }) => {
  const navigate = useNavigate();

  const handleNavigate = (expenseId) => {
    navigate(`/expenses/${expenseId}`);
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
      <div className="card-header text-center">Expenses</div>
      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <div className="list-group">
          {expenses.map((expense) => (
            <button
              key={expense._id}
              type="button"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleNavigate(expense._id)}
            >
              <div>
                <div className="fw-bold">{expense.description}</div>
                <div>
                  {expense.categoryName} - ${expense.amount}
                </div>
                {isGroup ? <div>User: {expense.user.username}</div> : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;
