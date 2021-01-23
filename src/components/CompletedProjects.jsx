import React, { useContext, Fragment } from "react";
import { DonationsContext, ProjectsContext } from "../App";

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
    <div style={{ border: "1px solid violet" }}>
      <p>Toteutetut projektit:</p>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nimi</th>
            <th>Käytetty</th>
          </tr>
        </thead>
        <tbody>
          {getCompletedProjects().length === 0 ? (
            <tr>
              <td>(ei vielä yhtään toteutettua projektia)</td>
            </tr>
          ) : (
            <Fragment>
              {getCompletedProjects().map((completedProject) => (
                <tr key={completedProject.id}>
                  <td>{completedProject.name}</td>
                  <td>{getFundingAmount(completedProject.id)}</td>
                </tr>
              ))}
            </Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { CompletedProjects };
