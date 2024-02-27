import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseOverview = ({ expenses }) => {
  const navigate = useNavigate();

  console.log(expenses);

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
          {expenses.map((expense) => (
            <button
              key={expense.id}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/expenses/${expense.id}`)}
            >
              Description: {expense.description} <br />
              Amount: ${expense.amount} <br />
              Category:{" "}
              {expense.category ? expense.category.categoryName : "N/A"} <br />
              User: {expense.user ? expense.user.username : "N/A"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseOverview;
