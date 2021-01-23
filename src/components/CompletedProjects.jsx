import React, { useContext, Fragment } from "react";
import Table from "react-bootstrap/Table";

import { DonationsContext, ProjectsContext } from "../App";
import { formatEurAmount } from "../utils";

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
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nimi</th>
            <th style={{ textAlign: "right" }}>Käytetty (€)</th>
          </tr>
        </thead>
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
      </Table>
    </div>
  );
};

export { CompletedProjects };
