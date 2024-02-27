import React, { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAdminData = async () => {
      const response = await axios.get(`${API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      setGroups(response.data.groups);
      setBudgets(response.data.budgets);
      setExpenses(response.data.expenses);
    };

    fetchAdminData();
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
      <div className="row mb-4 text-center">
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
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Users"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            style={{ width: "80%", margin: "auto" }}
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
            style={{ width: "80%", margin: "auto" }}
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
            style={{ width: "80%", margin: "auto" }}
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
            style={{ width: "80%", margin: "auto" }}
          />
          <ExpenseOverview expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
