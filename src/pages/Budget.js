import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import ExpenseCreationModal from "../components/ExpenseCreationModal";

function Budget() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { budgetId } = useParams();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [budget, setBudget] = useState({
    totalBudget: "",
    purpose: "",
    startDate: "",
    endDate: "",
    group: "",
    userId: "",
    budgetType: "",
  });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch analysis data
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/budgets/${budgetId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(response);
        setBudget(response.data);
        setExpenses(response.data.expenses);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchBudgetData();
  }, [budgetId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Ensure dates are formatted according to the expected format
    const formattedStartDate = new Date(budget.startDate);
    const formattedEndDate = new Date(budget.endDate);

    try {
      await axios.put(
        `${API_URL}/api/budgets/${budgetId}`,
        {
          totalBudget: budget.totalBudget,
          purpose: budget.purpose,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Budget details updated!");
      //console.log(response);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleAddExpense = () => {
    setShowExpenseModal(true);
  };

  const handleDeleteExpense = async (expenseId) => {
    const deleteConfirmed = window.confirm(
      "Are you sure about the deletion of this record permanently from the database?"
    );
    if (deleteConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/expenses/${expenseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Expense successfully deleted!");
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== expenseId)
        );
      } catch (err) {
        console.log("Erroe: " + err);
      }
    }
  };

  const handleDelete = async (e) => {
    const deleteConfirmed = window.confirm(
      "Are you sure about the deletion of this record permanently from the database?"
    );
    if (deleteConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/budgets/${budgetId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Budget successfully deleted!");
        if (budget.group == null) {
          navigate(`/dashboard`);
        } else {
          navigate(`/groups/${budget.group._id}`);
        }
      } catch (err) {
        console.log("Erroe: " + err);
      }
    }
  };

  return (
    <>
      <div className="container-fluid my-4 p-3">
        <h1 className="text-center mb-4">Budget Details</h1>
        <section
          className="mb-5 p-3"
          style={{ backgroundColor: "#e9ecef", borderRadius: "0.25rem" }}
        >
          <div className="d-flex flex-row">
            <div className="p-2">
              Purpose:{" "}
              <input
                type="text"
                name="purpose"
                value={budget.purpose}
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              Total Budget:{" "}
              <input
                type="text"
                name="totalBudget"
                value={budget.totalBudget}
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              Start Date:{" "}
              <input
                type="date"
                name="startDate"
                value={budget.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="p-2">
              End Date:{" "}
              <input
                type="date"
                name="endDate"
                value={budget.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-success" onClick={handleUpdate}>
              Update
            </button>
            <span style={{ marginRight: "10px" }}></span>
            <button className="btn btn-warning" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </section>

        <section>
          <h2>Expenses</h2>
          <div>
            <button className="btn btn-success" onClick={handleAddExpense}>
              Create New Expense
            </button>
          </div>
          <ExpenseCreationModal
            show={showExpenseModal}
            handleClose={() => setShowExpenseModal(false)}
            budgetId={budgetId}
          />
          <div>
            {/* Render each expense item */}
            {expenses.map((expense, index) => (
              <div key={index} className="list-group">
                <p className="fw-bold">Description: {expense.description}</p>
                <p>Amount: ${expense.amount}</p>
                <p>Date: {expense.date.toLocaleString()}</p>
                {/* <p>Expense ID: {expense._id}</p> */}
                <div className="d-flex">
                  <Link
                    className="btn btn-primary"
                    to={`/expenses/${expense._id}`}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDeleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </div>
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        </section>
        <div className="text-center pt-3">
          <Link className="btn btn-primary" to="/">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default Budget;
