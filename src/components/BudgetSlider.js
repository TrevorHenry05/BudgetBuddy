import React, { useState } from "react";

const BudgetSlider = ({ charts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className="card"
      style={{ width: "25rem", height: "22rem", margin: "auto" }}
    >
      {charts.length > 0 ? (
        <div>
          <div className="card-header text-center">
            <h2 className="card-title" style={{ fontSize: "1rem" }}>
              {charts[currentIndex].Purpose + " - Usage"}
            </h2>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={charts[currentIndex].chartUrl}
              className="card-img-top"
              alt="Budget Chart"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <button
                className={`btn ${
                  currentIndex === 0 ? "btn-secondary" : "btn-primary"
                }`}
                onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
                disabled={currentIndex === 0}
              >
                <i className="bi bi-arrow-left"></i>
              </button>
              <button
                className={`btn ${
                  currentIndex === charts.length - 1
                    ? "btn-secondary"
                    : "btn-primary"
                }`}
                onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
                disabled={currentIndex === charts.length - 1}
              >
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-header text-center">
          <h2 className="card-title" style={{ fontSize: "1rem" }}>
            No charts available
          </h2>
        </div>
      )}
    </div>
  );
};

export default BudgetSlider;
