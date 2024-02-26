import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetSlider from "../components/BudgetSlider";
import BudgetChartCard from "../components/BudgetChartCard";
import ExpensesList from "../components/ExpenseList";
import GroupList from "../components/GroupList";
import BudgetList from "../components/BudgetList";
import GroupCreationModal from "../components/GroupCreationModal";
import BudgetCreationModal from "../components/BudgetCreationModal";
import { API_URL } from "../constants";

const UserDashboard = () => {
  const [budgetUsage, setBudgetUsage] = useState([]);
  const [expensesPerMonthUrl, setExpensesPerMonthUrl] = useState("");
  const [expensesPerCategoryUrl, setExpensesPerCategoryUrl] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch analysis data
    const fetchAnalysisData = async () => {
      const response = await axios.get(`${API_URL}/api/analysis/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgetUsage(response.data.percentOfBudgetsUsed);
      setExpensesPerMonthUrl(response.data.expensesPerMonth.chartUrl);
      setExpensesPerCategoryUrl(response.data.expensesPerCategory.chartUrl);
      setBudgets(response.data.aggregatedUserData);
      setExpenses(
        response.data.aggregatedUserData.reduce((acc, budget) => {
          budget.expenses.forEach((expense) => {
            acc.push(expense);
          });
          return acc;
        }, [])
      );
    };

    // Fetch groups data
    const fetchGroupsData = async () => {
      const response = await axios.get(`${API_URL}/api/groups/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    };

    fetchAnalysisData();
    fetchGroupsData();
  }, []);

  return (
    <div className="container-fluid my-4 p-3">
      <h1 className="text-center mb-4">Your Dashboard</h1>

      <section
        className="mb-5 p-3"
        style={{ backgroundColor: "#e9ecef", borderRadius: "0.25rem" }}
      >
        <h2 className="text-center mb-3">Budget and Expense Analysis</h2>
        <div className="row g-3">
          {
            <div className="col-md-4">
              <BudgetSlider charts={budgetUsage} />
            </div>
          }
          {expensesPerMonthUrl && (
            <div className="col-md-4">
              <BudgetChartCard
                chartUrl={expensesPerMonthUrl}
                chartTitle="Expenses per Month"
              />
            </div>
          )}
          {expensesPerCategoryUrl && (
            <div className="col-md-4">
              <BudgetChartCard
                chartUrl={expensesPerCategoryUrl}
                chartTitle="Expenses per Category"
              />
            </div>
          )}
        </div>
      </section>

      <section
        className="row p-3"
        style={{ backgroundColor: "#e9ecef", borderRadius: "0.25rem" }}
      >
        <div className="col-md-4">
          <GroupList groups={groups} setShowModal={setShowGroupModal} />
        </div>
        <div className="col-md-4">
          <BudgetList budgets={budgets} setShowModal={setShowBudgetModal} />
        </div>
        <div className="col-md-4">
          <ExpensesList expenses={expenses} />
        </div>
      </section>
      <GroupCreationModal
        show={showGroupModal}
        handleClose={() => setShowGroupModal(false)}
      />
      <BudgetCreationModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
    </div>
  );
};

export default UserDashboard;
