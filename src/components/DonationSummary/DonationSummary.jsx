import React, { useEffect, useContext } from "react";
import { DonationsContext } from "../../App";
import { AvailableFunds, TotalDonations } from "./";

const DonationSummary = () => {
  const { donations } = useContext(DonationsContext);

  // Update the available funds after allocation changes in the add/cancel/remove table
  useEffect(() => {
    getAvailableFunds();
  }, [donations]);

  const getTotalDonations = () => {
    return donations.reduce((accumulator, currentDonation) => {
      return accumulator + currentDonation.sum;
    }, 0);
  };

  const getAvailableFunds = () => {
    return donations.reduce((accumulator, currentDonation) => {
      return currentDonation.target
        ? accumulator - currentDonation.sum
        : accumulator;
    }, getTotalDonations());
  };

  return (
    <div style={{ marginBottom: "35px" }}>
      <TotalDonations getTotalDonations={getTotalDonations} />
      <AvailableFunds getAvailableFunds={getAvailableFunds} />
    </div>
  );
};

export { DonationSummary };
