import React from "react";

const GroupInfo = () => {
  const groupInfoStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "96%",
    marginTop: "auto",
  };

  const groupTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const memberListStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const memberItemStyle = {
    margin: "10px 0",
  };

  return (
    <div style={groupInfoStyle}>
      <h2 style={groupTitleStyle}>Group 10 Members:</h2>
      <ul style={memberListStyle}>
        <li style={memberItemStyle}>
          Ankesh Kumar (B210821CS) -{" "}
          <a href="mailto:ankesh_b2100821cs@nitc.ac.in">
            ankesh_b210821cs@nitc.ac.in
          </a>
        </li>
        <li style={memberItemStyle}>
          Pranav Prashant (B210460CS) -{" "}
          <a href="mailto:pranav_b210460cs@nitc.ac.in">
            pranav_b210460cs@nitc.ac.in
          </a>
        </li>
        <li style={memberItemStyle}>
          Rahul B Menon (B210482CS) -{" "}
          <a href="mailto:rahul_b210482cs@nitc.ac.in">
            rahul_b210482cs@nitc.ac.in
          </a>
        </li>
        <li style={memberItemStyle}>
          Rahul P Aroli (B210544CS) -{" "}
          <a href="mailto:rahul_b210544cs@nitc.ac.in">
            rahul_b210544cs@nitc.ac.in
          </a>
        </li>
        <li style={memberItemStyle}>
          S Rishi Mohan (B210552CS) -{" "}
          <a href="mailto:rishi_b210552cs@nitc.ac.in">
            rishi_b210552cs@nitc.ac.in
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GroupInfo;
