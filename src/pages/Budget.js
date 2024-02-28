import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

function Budget() {

  const token = localStorage.getItem("token");
  const { budgetId } = useParams();

  const [budget, setBudget] = useState({
    totalBudget: "",
    purpose: "",
    startDate: "",
    endDate: "",
    userId: {},
    groupId: {},
    budgetType: {},
    expenses: []
  });

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch analysis data
    const fetchBudgetData = async () => {
      const response = await axios.get(`${API_URL}/api/budgets/${budgetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response);
      const formattedStartDate = new Date(response.data.startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(response.data.endDate).toISOString().split('T')[0];

      // Update budget state with formatted dates
      setBudget({
        ...response.data,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      });
      setExpenses(response.data.expenses)
    };
    fetchBudgetData();
  }, []);

  const handleChange = (e) => {
    //setCity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // try {
    //     const response = await axios.put(decodeURI("http://localhost:2000/"+ cityName), city)
    //     console.log(response.data.City)
    //     navigate("/");
    //   } catch (err) {
    //     console.log("Error: " + err);
    //   }
  };

  return (
    <>
      <h1 className="text-center mb-4">Budget Details</h1>
      <section 
        className="mb-5 p-3"
        style={{ backgroundColor: "#e9ecef", borderRadius: "0.25rem" }}>
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
            End Date: {" "}
            <input
              type="date"
              name="endDate"
              value={budget.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-2">
          <button onClick={handleUpdate}>Update</button>
        </div>
      </section>
    </>
  );
}

export default Budget;
