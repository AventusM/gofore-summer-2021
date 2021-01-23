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
    <div style={{ marginBottom: "35px" }}>
      <h1>
        Lahjoitukset yhteensä: <b>{`${getTotalDonations()}`}</b>€
      </h1>
      <h4>
        Kohdentamattomat varat: <b>{`${getAvailableFunds()}`}</b>€
      </h4>
    </div>
  );
};

export { DonationSummary };
