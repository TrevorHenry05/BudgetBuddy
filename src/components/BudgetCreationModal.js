import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const BudgetCreationModal = ({ show, handleClose, groupId = null }) => {
  const [purpose, setPurpose] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budgetType = groupId ? "group" : "personal";
    try {
      const response = await axios.post(
        `${API_URL}/api/budgets`,
        { purpose, totalBudget, startDate, endDate, budgetType, groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/budgets/${response.data.data._id}`);
    } catch (error) {
      alert("Error creating budget. Please try again.", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Budget</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="purpose" className="form-label">
                  Purpose
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="totalBudget" className="form-label">
                  Total Budget
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="totalBudget"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetCreationModal;
