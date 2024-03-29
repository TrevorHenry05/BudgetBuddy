import React from "react";
import { useNavigate } from "react-router-dom";

const ExpensesList = ({
  expenses,
  setShowModal = null,
  displayCreate = false,
  displayUser = false,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (expenseId) => {
    navigate(`/expenses/${expenseId}`);
  };

  const handleCreateExpense = () => {
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
        Expenses
        {displayCreate ? (
          <button className="btn btn-primary" onClick={handleCreateExpense}>
            Create Expense
          </button>
        ) : null}
      </div>
      <div
        className="card-body"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {expenses.length === 0 ? (
          <div>No Expenses Available</div>
        ) : (
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
                  {displayUser ? (
                    expense.user ? (
                      <div>User: {expense.user.username}</div>
                    ) : (
                      <div>No User </div>
                    )
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesList;
