import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { PlannedProjectsTableHeader, PlannedProjectsTableBody } from "./";

import {
  ProjectsContext,
  DonationsContext,
  NotificationContext,
} from "../../App";
import {
  DANGER_MESSAGE_PREFIX,
  DEFAULT_FUNDS_INDEX,
  EMPTY_ARRAY,
  NOTIFICATION_MESSAGE_DURATION_FIVE_SECONDS,
  SUCCESS_MESSAGE_PREFIX,
} from "../../constants";

const PlannedProjects = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { donations, setDonations } = useContext(DonationsContext);
  const { setMessage } = useContext(NotificationContext);

  const [availableFunds, setAvailableFunds] = useState(EMPTY_ARRAY);
  const [currentDonation, setCurrentDonation] = useState(DEFAULT_FUNDS_INDEX);

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

  const createNotification = (type, message) => {
    setMessage(`${type}:${message}`);
    setTimeout(() => {
      setMessage(null);
    }, NOTIFICATION_MESSAGE_DURATION_FIVE_SECONDS);
  };

  // This solution works, assuming that 1 donor has 1 type of sum
  // TODO: EDGE CASE FIX
  // TODO: Bypassing disabled button will crash the app. Maybe add an additional check here for available funds length >= 0?
  const addAvailableFunds = (projectId) => {
    const availableFundByIndex = availableFunds.find(
      (_, index) => index === currentDonation
    );

    if (availableFundByIndex) {
      setDonations(
        donations.map((donation) => {
          if (
            donation.donor === availableFundByIndex.donor &&
            donation.sum === availableFundByIndex.sum
          ) {
            return { ...donation, target: projectId, fundingPending: true };
          } else {
            return donation;
          }
        })
      );
    }

    setCurrentDonation(DEFAULT_FUNDS_INDEX); // Cover out of bounds situation by simply reseting to first available option
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

      createNotification(
        SUCCESS_MESSAGE_PREFIX,
        "Projekti toteutettu onnistuneesti!"
      );
    } else {
      createNotification(
        DANGER_MESSAGE_PREFIX,
        "Projektin toteutus ei onnistunut rahoituspuutteen vuoksi"
      );
    }
  };

  return (
    <div style={{ marginBottom: "35px" }}>
      <h4>Suunnitellut projektit</h4>
      <Table size="sm" responsive striped bordered hover>
        <PlannedProjectsTableHeader />
        <PlannedProjectsTableBody
          getPendingProjects={getPendingProjects}
          getTargetedDonations={getTargetedDonations}
          availableFunds={availableFunds}
          currentDonation={currentDonation}
          setCurrentDonation={setCurrentDonation}
          addAvailableFunds={addAvailableFunds}
          removePendingFunds={removePendingFunds}
          completeProject={completeProject}
        />
      </Table>
    </div>
  );
};

export { PlannedProjects };
