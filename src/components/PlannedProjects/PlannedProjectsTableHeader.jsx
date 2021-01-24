import React from "react";

const PlannedProjectsTableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ textAlign: "left" }}>Nimi</th>
        <th style={{ textAlign: "right" }}>Tavoite (€)</th>
        <th style={{ textAlign: "right" }}>Kohdennettu (€)</th>
        <th style={{ textAlign: "right", paddingRight: "16px" }}>Toiminnot</th>
      </tr>
    </thead>
  );
};

export { PlannedProjectsTableHeader };
