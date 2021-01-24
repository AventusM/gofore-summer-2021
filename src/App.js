import React, { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Container from "react-bootstrap/Container";

import {
  DonationSummary,
  PlannedProjects,
  CompletedProjects,
  NotificationMessage,
} from "./components";

import {
  DONATIONS_URL,
  NOTIFICATION_MESSAGE_DURATION_FIVE_SECONDS,
  PROJECTS_URL,
} from "./constants";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      const fetchProjectData = async () => {
        const response = await axios.get(PROJECTS_URL);
        setProjects(response.data);
      };

      const fetchDonationData = async () => {
        const response = await axios.get(DONATIONS_URL);
        const mappedResponse = response.data.map((donation) => ({
          ...donation,
          id: uuidv4(), // Cover the potential edge case so that 1 donor can have 1 sum multiple times
        }));
        setDonations(mappedResponse);
      };

      fetchProjectData();
      fetchDonationData();
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage(null);
      }, NOTIFICATION_MESSAGE_DURATION_FIVE_SECONDS);
    }
  }, []);

  return (
    <Container>
      <NotificationContext.Provider value={{ message, setMessage }}>
        <DonationsContext.Provider value={{ donations, setDonations }}>
          <ProjectsContext.Provider value={{ projects, setProjects }}>
            <NotificationMessage />
            <DonationSummary />
            <PlannedProjects />
            <CompletedProjects />
          </ProjectsContext.Provider>
        </DonationsContext.Provider>
      </NotificationContext.Provider>
    </Container>
  );
};

const DonationsContext = createContext(null);
const ProjectsContext = createContext(null);
const NotificationContext = createContext(null);

export { DonationsContext, ProjectsContext, NotificationContext };
export default App;
