import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropDown from "react-bootstrap/Dropdown";
import DropDownButton from "react-bootstrap/DropdownButton";

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
    <td className="hoverableTableRowSelect">
      <Row>
        <Col>
          <span>
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
          </span>
        </Col>
        <Col>
          <ButtonGroup
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              size="sm"
              variant="link"
              onClick={() => addAvailableFunds(projectId)}
              disabled={availableFunds.length === 0}
            >
              Lisää
            </Button>

            <Button
              size="sm"
              variant="link"
              onClick={() => removePendingFunds(projectId)}
            >
              Peruuta
            </Button>
            <Button
              size="sm"
              variant="link"
              onClick={() => completeProject(projectId)}
            >
              Toteuta
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </td>
  );
};

export { PlannedProjectFundingActions };
