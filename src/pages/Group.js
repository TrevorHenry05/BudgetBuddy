import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BudgetSlider from "../components/BudgetSlider";
import BudgetChartCard from "../components/BudgetChartCard";
import ExpensesList from "../components/ExpenseList";
import BudgetList from "../components/BudgetList";
import MemberList from "../components/MemberList";
import BudgetCreationModal from "../components/BudgetCreationModal";
import AddMemberModal from "../components/AddMemberModal";
import { API_URL } from "../constants";

function Group() {
  const [budgetUsage, setBudgetUsage] = useState([]);
  const [expensesPerMonthUrl, setExpensesPerMonthUrl] = useState("");
  const [expensesPerCategoryUrl, setExpensesPerCategoryUrl] = useState("");
  const [expensesPerUserUrl, setExpensesPerUserUrl] = useState("");
  const [group, setGroup] = useState({
    _id: "",
    groupName: "",
    members: [],
    memberIds: [],
  });
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAnalysisData = async (token) => {
      const response = await axios.get(
        `${API_URL}/api/analysis/group/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBudgetUsage(response.data.percentOfBudgetsUsed);
      setExpensesPerMonthUrl(response.data.expensesPerMonth.chartUrl);
      setExpensesPerCategoryUrl(response.data.expensesPerCategory.chartUrl);
      setExpensesPerUserUrl(response.data.expensesPerUser.chartUrl);
      setBudgets(response.data.aggregatedGroupData);
      setExpenses(
        response.data.aggregatedGroupData.reduce((acc, budget) => {
          budget.expenses.forEach((expense) => {
            acc.push(expense);
          });
          return acc;
        }, [])
      );
    };

    const fetchGroupData = async (token) => {
      const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroup(response.data);
    };

    const fetchNonGroupMembers = async (token) => {
      const response = await axios.get(`${API_URL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(response.data);
    };
    const fetchData = async () => {
      await fetchAnalysisData(token);
      await fetchGroupData(token);
      await fetchNonGroupMembers(token);
    };
    fetchData();
  }, [groupId]);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const fetchGroupData = async (token) => {
      const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroup(response.data);
    };
    try {
      await axios.put(
        `${API_URL}/api/groups/${groupId}`,
        { groupName: group.groupName, members: group.memberIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditingGroupName(false);
      fetchGroupData(token);
    } catch (error) {
      console.error("Failed to update group", error);
    }
  };

  const handleDeleteGroup = async () => {
    const deleteConfirmed = window.confirm(
      "Are you sure about the deletion of this record permanently from the database?"
    );

    if (!deleteConfirmed) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Group deleted successfully");
      alert("Group deleted successfully");

      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 404) {
        console.error("Group not found");
      } else if (error.response.status === 403) {
        console.error("Unauthorized to delete group");
        alert("You are not authorized to delete this group");
      }
    }
  };

  return (
    <div className="container-fluid my-4 p-3">
      <section
        className="mb-5 p-3"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
        }}
      >
        <h1>Group Details</h1>
        {/* Group name and member management section */}
        <div className="container mb-3">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
              {isEditingGroupName ? (
                <input
                  type="text"
                  value={group.groupName}
                  onChange={(e) =>
                    setGroup({ ...group, groupName: e.target.value })
                  }
                  className="form-control"
                />
              ) : (
                <h2 className="mb-0">{group.groupName}</h2>
              )}
            </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditingGroupName(!isEditingGroupName)}
              >
                {isEditingGroupName ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        <MemberList
          members={group.members}
          setShowModal={setShowAddMemberModal}
          groupId={groupId}
          setGroup={setGroup}
        />

        <div className="text-center mt-3">
          <button className="btn btn-success me-2" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="btn btn-success" onClick={handleDeleteGroup}>
            Delete Group
          </button>
        </div>
      </section>

      {/* Budget and expense analysis section */}
      <section
        className="mb-5 p-3"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
        }}
      >
        <h2 className="text-center mb-3">Budget and Expense Analysis</h2>
        <div className="row g-3">
          <BudgetSlider charts={budgetUsage} />
          {expensesPerUserUrl && (
            <BudgetChartCard
              chartUrl={expensesPerUserUrl}
              chartTitle="Expenses per User"
            />
          )}
          {expensesPerMonthUrl && (
            <BudgetChartCard
              chartUrl={expensesPerMonthUrl}
              chartTitle="Expenses per Month"
            />
          )}
          {expensesPerCategoryUrl && (
            <BudgetChartCard
              chartUrl={expensesPerCategoryUrl}
              chartTitle="Expenses per Category"
            />
          )}
        </div>
      </section>

      {/* Budget and expense lists section */}
      <section
        className="row p-3"
        style={{
          backgroundColor: "white",
          borderRadius: "0.25rem",
          width: "90%",
          margin: "auto",
        }}
      >
        <div className="col-md-6">
          <BudgetList
            budgets={budgets}
            setShowModal={setShowBudgetModal}
            displayUser={true}
          />
        </div>
        <div className="col-md-6">
          <ExpensesList expenses={expenses} displayUser={true} />
        </div>
      </section>

      {/* Modals for creating budgets and adding members */}
      <BudgetCreationModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
        groupId={groupId}
      />
      <AddMemberModal
        show={showAddMemberModal}
        users={allUsers}
        groupMembers={group.memberIds}
        handleClose={() => setShowAddMemberModal(false)}
        setGroup={setGroup}
        groupId={groupId}
      />
    </div>
  );
}

export default Group;
