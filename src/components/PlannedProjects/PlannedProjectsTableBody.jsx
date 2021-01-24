import React from "react";

import { PlannedProjectFundingActions } from "./";
import { formatEurAmount } from "../../utils";

const PlannedProjectsTableBody = (props) => {
  const { getPendingProjects, getTargetedDonations, ...rest } = props;
  return (
    <tbody>
      {getPendingProjects().map((project) => (
        <tr key={project.id}>
          <td>{project.name}</td>
          <td style={{ textAlign: "right" }}>
            {formatEurAmount(project.target)}
          </td>
          <td style={{ textAlign: "right" }}>
            {formatEurAmount(getTargetedDonations(project.id))}
          </td>
          <PlannedProjectFundingActions projectId={project.id} {...rest} />
        </tr>
      ))}
    </tbody>
  );
};

export { PlannedProjectsTableBody };
