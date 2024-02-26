import React from "react";

const BudgetChartCard = ({ chartTitle, chartUrl }) => {
  return (
    <div
      className="card"
      style={{ width: "25rem", height: "20rem", margin: "auto" }}
    >
      <div className="card-header text-center">
        <h2 className="card-title" style={{ fontSize: "1rem" }}>
          {chartTitle || "No Title"}
        </h2>
      </div>
      {chartUrl ? (
        <div className="d-flex justify-content-center">
          <img
            src={chartUrl}
            className="card-img-top"
            alt="Chart"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <div className="card-body text-center">
          <p className="card-text">No data available</p>
        </div>
      )}
    </div>
  );
};

export default BudgetChartCard;
