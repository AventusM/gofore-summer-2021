import React, { Fragment } from "react";

import { formatEurAmount } from "../../utils";

const CompletedProjectsTableBody = (props) => {
  const { getCompletedProjects, getFundingAmount } = props;
  return (
    <tbody>
      {getCompletedProjects().length === 0 ? (
        <tr>
          <td style={{ textAlign: "left" }}>
            (ei vielä yhtään toteutettua projektia)
          </td>
          <td style={{ textAlign: "right" }}>-</td>
        </tr>
      ) : (
        <Fragment>
          {getCompletedProjects().map((completedProject) => (
            <tr key={completedProject.id}>
              <td style={{ textAlign: "left" }}>{completedProject.name}</td>
              <td style={{ textAlign: "right" }}>
                {formatEurAmount(getFundingAmount(completedProject.id))}
              </td>
            </tr>
          ))}
        </Fragment>
      )}
    </tbody>
  );
};

export { CompletedProjectsTableBody };
