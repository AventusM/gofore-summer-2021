import React, { useEffect, useContext } from "react";
import { DonationsContext } from "../App";

const DonationSummary = () => {
  const { donations } = useContext(DonationsContext);

  useEffect(() => {
    getAvailableFunds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div>
      <h2>Lahjoitukset yhteensä: {`${getTotalDonations()}`}</h2>
      <h3>Kohdentamattomat varat: {`${getAvailableFunds()}`}</h3>
    </div>
  );
};

export { DonationSummary };
