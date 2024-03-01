import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../constants";

function Expense() {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [categoryId, setCategoryId] = useState("");
  const [expenseCategories, setExpenseCategories] = useState([]);

  //page status
  const [isEditable, setEditable] = useState(false); //is the page currently editable
  const [altered, setAltered] = useState(false); //check if the page's details have been altered

  const [expense, setExpense] = useState({
    _id: "",
    amount: 0,
    date: "",
    description: "",
    budgetId: "",
    group: "",
    category: "",
    user: "",
  });

  //save values to reset changes
  const [orginalExpense, setOriginalExpense] = useState({
    _id: "",
    amount: 0,
    date: "",
    description: "",
    budgetId: "",
    group: "",
    category: "",
    user: "",
  });

  useEffect(() => {
    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/expensecategories/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenseCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch expense categories", error);
      }
    };

    //fetch expense details
    const fetchExpenseData = async () => {
      const response = await axios.get(`${API_URL}/api/expenses/` + expenseId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpense(response.data);
      setCategoryId(response.data.category._id);
      setOriginalExpense(response.data);
    };

    if (expenseId && token) {
      fetchExpenseData();
      fetchExpenseCategories();
    }
  }, [expenseId, token]);

  const handleEdit = (e) => {
    setEditable(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAltered(true);
  };

  const handleCancel = () => {
    setEditable(false);
    setExpense(orginalExpense);
    setCategoryId(orginalExpense.category._id);
    setAltered(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (altered) {
        const response = await axios.put(
          `${API_URL}/api/expenses/` + expenseId,
          {
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
            categoryId: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.statusCode === 200) alert("Expense details updated");
        setEditable(false);
        setAltered(false);
      } else {
        alert("No changes have been made!");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleDelete = async () => {
    const deleteConfirmed = window.confirm(
      "Are you sure about the deletion of this record permanently from the database?"
    );
    if (deleteConfirmed) {
      const response = await axios.delete(
        `${API_URL}/api/expenses/` + expenseId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.statusCode === 200) alert("Expense deleted");
      navigate("/budget/" + orginalExpense.budgetId);
    }
  };

  return (
    <>
      <div className="container-fluid my-4 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link
            className="btn btn-outline-secondary"
            to={`/budgets/${expense.budgetId}`}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
          <h1 className="mx-auto">Expense Details</h1>
          <div className="btn btn-outline-secondary invisible">
            <i className="bi bi-arrow-right"></i> Dashboard
          </div>
        </div>
        <section
          style={{
            backgroundColor: "white",
            borderRadius: "0.25rem",
            width: "90%",
            margin: "auto",
            padding: "20px",
            paddingTop: "100px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => handleEdit(!isEditable)}
            >
              Edit
            </button>
          </div>
          <div>
            {/** Top Section */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <p>
                <b>Created by: </b>
                {expense.user ? expense.user.username : "N/A"}
              </p>
              <div>
                <label
                  htmlFor="date"
                  className="form-label"
                  data-bs-placement="right"
                >
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  data-bs-placement="right"
                  name="date"
                  id="date"
                  disabled={!isEditable}
                  value={expense.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="form-label"
                data-bs-placement="left"
              >
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                data-bs-placement="left"
                name="amount"
                id="amount"
                disabled={!isEditable}
                value={expense.amount}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label
                htmlFor="description"
                className="form-label"
                data-bs-placement="left"
              >
                Description
              </label>
              <input
                type="text"
                className="form-control"
                data-bs-placement="left"
                name="description"
                id="description"
                disabled={!isEditable}
                value={expense.description}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="categoryId"
                disabled={!isEditable}
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setAltered(true);
                }}
                required
              >
                <option value="">Select a category</option>
                {expenseCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div></div>
            <div>
              {isEditable === true ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Expense;
