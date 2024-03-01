import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";

function Expense() {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //page status
  const [isEditable, setEditable] = useState(false);      //is the page currently editable
  const [altered, setAltered] = useState(false);          //check if the page's details have been altered

  const [expense, setExpense] = useState({
    amount: 0,
    date: "",
    description: "",
    userId: "",
    categoryId: "",
    groupId: "",
    budgetId: ""
  });

  //save values to reset changes
  const [orginalExpense, setOriginalExpense] = useState({
    amount: 0,
    date: "",
    description: "",
    userId: "",
    categoryId: "",
    groupId: "",
    budgetId: ""
  });

  useEffect(() => {
    //fetch expense details
    const fetchExpenseData = async () => {
      const response = await axios.get(`${API_URL}/api/expenses/` + expenseId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpense(response.data);
      setOriginalExpense(response.data);
    };

    if (expenseId && token) {
      fetchExpenseData();
    }
  }, [expenseId, token]);

  const handleEdit = (e) => {
    setEditable(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({
      ...prev,
      [name]: value
    }));
    setAltered(true);
  }

  const handleCancel = () => {
    setExpense(orginalExpense);
    setAltered(false);
  }

  const handleSubmit = async (event) => {
    event.pereventDefault();
    if (altered) {
      const response = await axios.put(`${API_URL}/api/expenses/` + expenseId,
        {
          amount: expense.amount,
          date: expense.date,
          description: expense.description,
          userId: expense.userId,
          categoryId: expense.categoryId,
          groupId: expense.groupId,
          budgetId: expense.budgetId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      if (response.statusCode === 200) window.alert("Expense details updated");

    } else {
      window.alert("No changes have been made!");
    }
  }

  const handleDelete = async () => {
    const response = await axios.delete(`${API_URL}/api/expenses/` + expenseId)
      .set("Authorization", `Bearer ${token}`);
    if (response.statusCode === 200) window.alert("Expense deleted")
    navigate("/budget/" + orginalExpense.budgetId);
  }

  return (
    < >
      <section style={{
        backgroundColor: "white",
        borderRadius: "0.25rem",
        width: "90%",
        margin: "auto",
      }}>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h5 className="modal-title">Expense Details</h5>
          <button type="button" className="btn btn-warning" onClick={() => handleEdit(!isEditable)}>Edit</button>
        </div >
        <div>
          {/** Top Section */}
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div></div>
            <div>
              <label htmlFor="date" className="form-label" data-bs-placement="right">Date</label>
              <input type="date" className="form-control" data-bs-placement="right" name="date" id="date" value={expense.date} onChange={(e) => handleChange(e.target.value)} required />
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="form-label" data-bs-placement="left">Amount</label>
            <input type="number" className="form-control" data-bs-placement="left" name="amount" id="amount" value={expense.amount} onChange={(e) => handleChange(e.target.value)} required />
          </div>
          <br />
          <div>
            <label htmlFor="description" className="form-label" data-bs-placement="left">Description</label>
            <input type="text" className="form-control" data-bs-placement="left" name="description" id="description" value={expense.description} onChange={(e) => handleChange(e.target.value)} required />
          </div>

          {/** Bottom Section */}

        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div></div>
          <div>{isEditable === true ? (
            <div>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div></div>
          )}</div>
        </div>
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
      </section>
    </>
  );
}

export default Expense;
