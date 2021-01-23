import React, { useState, useContext, useEffect } from "react";
import { ProjectsContext, DonationsContext } from "../App";

const DEFAULT_INDEX = 0;
const EMPTY_ARRAY = [];

const PlannedProjects = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { donations, setDonations } = useContext(DonationsContext);

  const [availableFunds, setAvailableFunds] = useState(EMPTY_ARRAY);
  const [currentDonation, setCurrentDonation] = useState(DEFAULT_INDEX);

  // Update the options whenever the list of donations gets changed
  useEffect(() => {
    const getFundsWithoutTarget = () => {
      return donations.filter((donation) => !donation.target);
    };

    setAvailableFunds(getFundsWithoutTarget());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donations]);

  const getTargetedDonations = (projectId) => {
    return donations.reduce((accumulator, currentDonation) => {
      return projectId === currentDonation.target
        ? accumulator + currentDonation.sum
        : accumulator;
    }, 0);
  };

  // Component table should display non-completed - prop objects
  const getPendingProjects = () => {
    return projects.filter((project) => !project.completed);
  };

  // This solution works, assuming that 1 donor has 1 type of sum
  // TODO: EDGE CASE FIX
  // TODO: Bypassing disabled button will crash the app. Maybe add an additional check here for available funds length >= 0?
  const addAvailableFunds = (projectId) => {
    const getAvailableFundByIndex = availableFunds.find(
      (_, index) => index === currentDonation
    );

    setDonations(
      donations.map((donation) => {
        if (
          donation.donor === getAvailableFundByIndex.donor &&
          donation.sum === getAvailableFundByIndex.sum
        ) {
          return { ...donation, target: projectId, fundingPending: true };
        } else {
          return donation;
        }
      })
    );

    setCurrentDonation(DEFAULT_INDEX); // Cover out of bounds situation by simply reseting to first available option
  };

  const removePendingFunds = (projectId) => {
    setDonations(
      donations.map((donation) => {
        const { target, fundingPending, ...rest } = donation;
        if (target === projectId && fundingPending) {
          return { ...rest };
        } else {
          return donation;
        }
      })
    );
  };

  // TODO: CHECK IF FUNDING TRESHOLD IS BEING MET
  // TODO: MAP TO started:true etc.
  const completeProject = (projectId) => {
    const projectFundingTotal = donations.reduce(
      (accumulator, currentDonation) => {
        if (currentDonation.target === projectId) {
          return accumulator + currentDonation.sum;
        } else {
          return accumulator;
        }
      },
      0
    );

    const foundProject = projects.find((project) => project.id === projectId);
    if (projectFundingTotal >= foundProject.target) {
      setDonations(
        donations.map((donation) => {
          const { fundingPending, ...rest } = donation;
          if (donation.id === projectId) {
            return { ...rest }; // Remove now redundant pendingDonation flag
          } else {
            return donation;
          }
        })
      );

      setProjects(
        projects.map((project) => {
          if (project.id === projectId) {
            return { ...project, completed: true }; // Add an active flag to projects to that it can move from one "category" to another
          } else {
            return project;
          }
        })
      );
    } else {
      console.log("NOOOO");
      // TODO: Display error notification notification?
    }
  };

  return (
    <div>
      <h3>Suunnitellut projektit</h3>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nimi</th>
            <th>Tavoite</th>
            <th>Kohdennettu</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getPendingProjects().map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td style={{ textAlign: "right" }}>{project.target}</td>
              <td style={{ textAlign: "right" }}>
                {getTargetedDonations(project.id)}
              </td>
              <PlannedProjectFundingActions
                projectId={project.id}
                availableFunds={availableFunds}
                setCurrentDonation={setCurrentDonation}
                addAvailableFunds={addAvailableFunds}
                removePendingFunds={removePendingFunds}
                completeProject={completeProject}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PlannedProjectFundingActions = (props) => {
  const {
    projectId,
    setCurrentDonation,
    availableFunds,
    addAvailableFunds,
    removePendingFunds,
    completeProject,
  } = props;

  const handleOptionChange = (event) => {
    setCurrentDonation(Number(event.target.value));
  };

  return (
    <td>
      <select onChange={handleOptionChange}>
        {availableFunds.map((availableDonation, index) => (
          <option key={index} value={index}>
            {availableDonation.donor}, {availableDonation.sum}€
          </option>
        ))}
      </select>
      <button
        onClick={() => addAvailableFunds(projectId)}
        disabled={availableFunds.length === 0}
      >
        Lisää
      </button>
      <button onClick={() => removePendingFunds(projectId)}>Peruuta</button>
      <button onClick={() => completeProject(projectId)}>Toteuta</button>
    </td>
  );
};

export { PlannedProjects };
