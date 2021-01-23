import React, { useState, useContext, useEffect } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropDown from "react-bootstrap/Dropdown";
import DropDownButton from "react-bootstrap/DropdownButton";

import { ProjectsContext, DonationsContext } from "../App";
import { DEFAULT_FUNDS_INDEX, EMPTY_ARRAY } from "../constants";

const PlannedProjects = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { donations, setDonations } = useContext(DonationsContext);

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
    <div style={{ marginBottom: "35px" }}>
      <h4>Suunnitellut projektit</h4>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nimi</th>
            <th style={{ textAlign: "right" }}>Tavoite (€)</th>
            <th style={{ textAlign: "right" }}>Kohdennettu (€)</th>
            <th style={{ textAlign: "center" }}>Toiminnot</th>
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
                currentDonation={currentDonation}
                setCurrentDonation={setCurrentDonation}
                addAvailableFunds={addAvailableFunds}
                removePendingFunds={removePendingFunds}
                completeProject={completeProject}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const PlannedProjectFundingActions = (props) => {
  const {
    projectId,
    currentDonation,
    setCurrentDonation,
    availableFunds,
    addAvailableFunds,
    removePendingFunds,
    completeProject,
  } = props;

  const handleOptionChange = (eventKey) => {
    setCurrentDonation(Number(eventKey));
  };

  return (
    <td>
      <Row>
        <Col>
          <DropDownButton
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSelect={handleOptionChange}
            size="sm"
            title={
              availableFunds.length > 0
                ? `${availableFunds[currentDonation].donor}, ${availableFunds[currentDonation].sum}€`
                : "Ei dataa"
            }
            variant="info"
          >
            {availableFunds.map((availableDonation, index) => (
              <DropDown.Item key={index} eventKey={index}>
                {availableDonation.donor}, {availableDonation.sum}€
              </DropDown.Item>
            ))}
          </DropDownButton>
        </Col>
        <Col>
          <ButtonGroup
            style={{
              display: "flex",
              alignItems: "center",
            }}
            size="sm"
          >
            <Button
              variant="link"
              onClick={() => addAvailableFunds(projectId)}
              disabled={availableFunds.length === 0}
            >
              Lisää
            </Button>
            <Button
              variant="link"
              onClick={() => removePendingFunds(projectId)}
            >
              Peruuta
            </Button>
            <Button variant="link" onClick={() => completeProject(projectId)}>
              Toteuta
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </td>
  );
};

export { PlannedProjects };
