import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import {
  DonationSummary,
  PlannedProjects,
  CompletedProjects,
} from "./components";

import { DONATIONS_URL, PROJECTS_URL } from "./constants";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);

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
      <DonationsContext.Provider value={{ donations, setDonations }}>
        <ProjectsContext.Provider value={{ projects, setProjects }}>
          <DonationSummary />
          <PlannedProjects />
          <CompletedProjects />
        </ProjectsContext.Provider>
      </DonationsContext.Provider>
    </Container>
  );
};

const DonationsContext = createContext(null);
const ProjectsContext = createContext(null);

export { DonationsContext, ProjectsContext };
export default App;
