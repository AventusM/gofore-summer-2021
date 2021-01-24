import React, { useContext } from "react";
import Table from "react-bootstrap/Table";

import { DonationsContext, ProjectsContext } from "../../App";
import { CompletedProjectsTableBody, CompletedProjectsTableHeader } from "./";

const CompletedProjects = () => {
  const { projects } = useContext(ProjectsContext);
  const { donations } = useContext(DonationsContext);

  const getCompletedProjects = () => {
    return projects.filter((project) => project.completed);
  };

  const getFundingAmount = (projectId) => {
    return donations.reduce((accumulator, currentDonation) => {
      if (currentDonation.target === projectId) {
        return accumulator + currentDonation.sum;
      } else {
        return accumulator;
      }
    }, 0);
  };

  return (
    <div>
      <h4>Toteutetut projektit</h4>
      <Table size="sm" responsive striped bordered hover>
        <CompletedProjectsTableHeader />
        <CompletedProjectsTableBody
          getCompletedProjects={getCompletedProjects}
          getFundingAmount={getFundingAmount}
        />
      </Table>
    </div>
  );
};

export { CompletedProjects };
