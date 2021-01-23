import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import {
  DonationSummary,
  PlannedProjects,
  CompletedProjects,
  NotificationMessage,
} from "./components";

import { DONATIONS_URL, PROJECTS_URL } from "./constants";

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
        setDonations(response.data);
      };

      fetchProjectData();
      fetchDonationData();
    } catch (error) {
      console.log("Error while fetching data", error.message);
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
