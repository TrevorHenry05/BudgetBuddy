import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import BudgetChartCard from "../components/BudgetChartCard";
import BudgetSlider from "../components/BudgetSlider";
import BudgetList from "../components/BudgetList";
import BudgetCreationModal from "../components/BudgetCreationModal";

function Group() {
  const { groupId } = useParams();
  const [budgetUsage, setBudgetUsage] = useState([]);
  const [group, setGroup] = useState(null);
  const [expensesPerMonthUrl, setExpensesPerMonthUrl] = useState("");
  const [expensesPerUserUrl, setExpensesPerUser] = useState("");
  const [expensesPerCategoryUrl, setExpensesPerCategoryUrl] = useState("");
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroup(response.data);
        setGroupName(response.data.groupName);
        setMembers(response.data.members);
        fetchGroupAnalysisData();
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    const fetchGroupAnalysisData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/analysis/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBudgets(response.data.aggregatedGroupData);
        setBudgetUsage(response.data.percentOfBudgetsUsed);
        setExpensesPerMonthUrl(response.data.expensesPerMonth.chartUrl);
        setExpensesPerCategoryUrl(response.data.expensesPerCategory.chartUrl);
      } catch (error) {
        console.error("Error fetching group analysis data:", error);
      }
    };

    if (groupId) {
      fetchGroup();
    }
  }, [groupId, token]);

  const handleUpdateGroup = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/groups/${groupId}`, {
        groupName,
        members
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroup(response.data.data);
      alert("Group updated successfully");
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  if (!group) {
    return <p>Loading...</p>;
  }

  // const handleUpdateGroup = () => {
  //   setShow
  // }
  return (
    <>
      <div className="container-fluid my-4 p-3">
        <h1 className="text-center mb-4">{group.groupName} Dashboard</h1>
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
            <div className="col-md-4">
              <BudgetSlider charts={budgetUsage} />
            </div>
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

        <section className="row p-3" style={{ backgroundColor: "white", borderRadius: "0.25rem", width: "90%", margin: "auto" }}>


          <div className="card" style={{
            width: "80%",
            margin: "auto",
            overflow: "hidden",
            height: "356px"
          }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              {group.groupName}
              <button className="btn btn-primary" onClick={handleUpdateGroup}>Update Group</button>
            </div>
            <div className="card-body"
              style={{ maxHeight: "300px", overflowY: "auto" }}>
              <p>Members:</p>
              <ul>
                {group.members.map((member, index) => (
                  <li key={index}>
                    {/* Display member username */}
                    <p>Username: {member.username}</p>
                  </li>
                ))}
              </ul>
</div>
            </div>
            <div className="col-md-4">
              <BudgetList budgets={budgets} setShowModal={setShowBudgetModal} />
            </div>
        </section >

        <BudgetCreationModal show={showBudgetModal} handleClose={() => setShowBudgetModal(false)} groupId={groupId} />
      </div >
    </>
  );
}

export default Group;
