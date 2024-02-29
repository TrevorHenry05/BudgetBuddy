import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";

function Expense() {
  const { expenseId } = useParams();
  const navigate = useNavigate();

  //page status
  const { isEditable, setEditable } = useState(false);      //is the page currently editable
  const { altered, setAltered } = useState(false);          //check if the page's details have been altered

  const { amount, setAmount } = useState(0);
  const { description, setDescription } = useState('');
  const { date, setDate } = useState({ date: new Date() });

  //ids
  const { userID, setUserID } = useState("");
  const { groupID, setGroupID } = useState("");
  const { categoryID, setCategoryID } = useState("");
  const { budgetID, setBudgetID } = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    //fetch expense details
    const fetchExpenseData = async () => {
      const response = await axios.get(`${API_URL}/api/expenses/` + expenseId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmount(response.amount);
      setDate(response.date);
      setDescription(response.description);
      setUserID(response.userId);
      setGroupID(response.groupId);
      setCategoryID(response.categoryId);
      setBudgetID(response.budgetId);
    };

    fetchExpenseData();
  }, [expenseId, amount, description, date, budgetID, groupID, userID, categoryID]);

  const handleEdit = (e) => {
    setEditable(e);
  };

  const handleChange = (e) => {
    setAltered(e);
  }

  const handleSubmit = async (event) => {
    event.pereventDefault();
    if (altered){
      const token = localStorage.getItem("token");

      const response = await axios.put(`${API_URL}/api/expenses/` + expenseId)
        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: amount,
          date: date,
          description: description,
          userId: userID,
          categoryId: categoryID,
          groupId: groupID,
          budgetId: budgetID
        });
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
                <label htmlFor="date" className="form-label" data-bs-placement="right">Date</label>
                <input type="date" className="form-control" data-bs-placement="right" id="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleChange(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
