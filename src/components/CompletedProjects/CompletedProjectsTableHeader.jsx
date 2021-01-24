import React from "react";

const CompletedProjectsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ textAlign: "left" }}>Nimi</th>
        <th style={{ textAlign: "right" }}>Käytetty (€)</th>
      </tr>
    </thead>
  );
};

export { CompletedProjectsTableHeader };
