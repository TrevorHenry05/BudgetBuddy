import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto"; // For Chart.js 3
import UserOverview from "../components/UserOverview";
import GroupOverview from "../components/GroupOverview";
import BudgetOverview from "../components/BudgetOverview";
import ExpenseOverview from "../components/ExpenseOverview";
import { API_URL } from "../constants";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [budgetSearch, setBudgetSearch] = useState("");
  const [expenseSearch, setExpenseSearch] = useState("");

  const [timeView, setTimeView] = useState("monthly");
  const [budgetDistribution, setBudgetDistribution] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [expensesDaily, setExpensesDaily] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [expensesMonthly, setExpensesMonthly] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAdminData = async () => {
      const response = await axios.get(`${API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { budgets, expenses } = response.data;

      // Budget Distribution
      const budgetTypes = budgets.reduce((acc, budget) => {
        acc[budget.budgetType] =
          (acc[budget.budgetType] || 0) + budget.totalBudget;
        return acc;
      }, {});

      setBudgetDistribution({
        labels: Object.keys(budgetTypes),
        datasets: [{ data: Object.values(budgetTypes) }],
      });

      // Expenses Over Time
      const expensesByDay = {};
      const expensesByMonth = {};

      expenses.forEach((expense) => {
        const dayKey = expense.date;
        const monthKey = expense.date.substring(0, 7);

        expensesByDay[dayKey] = (expensesByDay[dayKey] || 0) + expense.amount;
        expensesByMonth[monthKey] =
          (expensesByMonth[monthKey] || 0) + expense.amount;
      });

      setExpensesDaily({
        labels: Object.keys(expensesByDay),
        datasets: [
          {
            label: "Expenses Per Day (USD)",
            data: Object.values(expensesByDay),
            backgroundColor: "#9678b6",
            borderColor: "#a89cc8",
          },
        ],
        label: "Expenses Over Time",
      });

      setExpensesMonthly({
        labels: Object.keys(expensesByMonth),
        datasets: [
          {
            label: "Expenses Per Month (USD)",
            data: Object.values(expensesByMonth),
            backgroundColor: "#40e0d0",
            borderColor: "#36bfb6",
          },
        ],
        label: "Expenses Over Time",
      });

      setUsers(response.data.users);
      setGroups(response.data.groups);
      setBudgets(response.data.budgets);
      setExpenses(response.data.expenses);
    };

    fetchAdminData();

    setBudgetDistribution((prevState) => ({
      ...prevState,
      datasets: prevState.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: ["#9678b6", "#40e0d0"],
        borderColor: ["#a89cc8", "#36bfb6"],
      })),
      label: "Budget Distribution",
    }));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const filteredBudgets = budgets.filter(
    (budget) =>
      budget.purpose.toLowerCase().includes(budgetSearch.toLowerCase()) ||
      (budget.user &&
        budget.user.username.toLowerCase().includes(budgetSearch.toLowerCase()))
  );

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      (expense.user &&
        expense.user.username
          .toLowerCase()
          .includes(expenseSearch.toLowerCase())) ||
      (expense.category &&
        expense.category.categoryName
          .toLowerCase()
          .includes(expenseSearch.toLowerCase()))
  );

  return (
    
    <div className="container-fluid mt-4">
      <h1 className="text-center">Admin Dashboard</h1>
      <div
        className="row mb-4 text-center"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
          padding: "20px",
        }}
      >
        <div className="col">
          <h4>Total Users</h4>
          <p>{filteredUsers.length}</p>
        </div>
        <div className="col">
          <h4>Total Groups</h4>
          <p>{filteredGroups.length}</p>
        </div>
        <div className="col">
          <h4>Total Budgets</h4>
          <p>{filteredBudgets.length}</p>
        </div>
        <div className="col">
          <h4>Total Expenses</h4>
          <p>{filteredExpenses.length}</p>
          <p>
            $
            {filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)}
          </p>
        </div>
      </div>
      <div
        className="row"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
          padding: "20px",
        }}
      >
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Users"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            style={{ width: "80%", minWidth: "300px", margin: "auto" }}
          />
          <UserOverview users={filteredUsers} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Groups"
            value={groupSearch}
            onChange={(e) => setGroupSearch(e.target.value)}
            style={{ width: "80%", minWidth: "300px", margin: "auto" }}
          />
          <GroupOverview groups={filteredGroups} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Budgets"
            value={budgetSearch}
            onChange={(e) => setBudgetSearch(e.target.value)}
            style={{ width: "80%", minWidth: "300px", margin: "auto" }}
          />
          <BudgetOverview budgets={filteredBudgets} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Expenses"
            value={expenseSearch}
            onChange={(e) => setExpenseSearch(e.target.value)}
            style={{ width: "80%", minWidth: "300px", margin: "auto" }}
          />
          <ExpenseOverview expenses={filteredExpenses} />
        </div>
      </div>

      <div
        className="row mt-4"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
          height: "525px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          className="col-md-6 d-flex flex-column align-items-center"
          style={{ height: "400px" }}
        >
          <h4 className="text-center">Budget Distribution</h4>
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%", height: "100%" }}
          >
            <Pie
              data={budgetDistribution}
              options={{ maintainAspectRatio: true }}
            />
          </div>
        </div>
        <div
          className="col-md-6 d-flex flex-column align-items-center"
          style={{ height: "400px" }}
        >
          <h4 className="text-center">Expenses Over Time</h4>
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%", height: "100%" }}
          >
            {timeView === "daily" ? (
              <Line
                data={expensesDaily}
                options={{ maintainAspectRatio: true }}
              />
            ) : (
              <Line
                data={expensesMonthly}
                options={{ maintainAspectRatio: true }}
              />
            )}
          </div>
          <button
            className="btn btn-warning"
            onClick={() =>
              setTimeView((prevView) =>
                prevView === "monthly" ? "daily" : "monthly"
              )
            }
          >
            Switch to {timeView === "monthly" ? "Daily" : "Monthly"} View
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
