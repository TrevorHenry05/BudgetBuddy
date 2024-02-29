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

    fetchExpenseData();
  }, [expenseId, amount, description, date, budgetID, groupID, userID, categoryID]);

  const handleEdit = (e) => {
    setEditable(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleCancel = () => {
    setExpense(orginalExpense);
  }

  const handleSubmit = async (event) => {
    event.pereventDefault();
    if (altered) {
      const response = await axios.put(`${API_URL}/api/expenses/` + expenseId)
        .set("Authorization", `Bearer ${token}`)
        .send(expense);
      if (response.statusCode === 200) window.alert("Expense details updated");
    } else {
      window.alert("No changes have been made!");
    }
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/api/expenses/` + expenseId)
      .set("Authorization", `Bearer ${token}`);
    if (response.statusCode === 200) window.alert("Expense deleted")
    navigate("/budget/" + budgetID);
  }

  return (
    <>
      <div className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Expense Details</h5>
              <button type="button" className="btn btn-warning" onClick={handleEdit(!isEditable)}>Edit</button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="amount" className="form-label" data-bs-placement="left">Amount</label>
                <input type="number" className="form-control" data-bs-placement="left" name="amount" value={expense.amount} onChange={(e) => setExpense(e.target.value)} required />
                <label htmlFor="date" className="form-label" data-bs-placement="right">Date</label>
                <input type="date" className="form-control" data-bs-placement="right" name="date" value={expense.date} onChange={(e) => setExpense(e.target.value)} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
