import React from "react";
import { formatEurAmount } from "../../utils";

const TotalDonations = (props) => {
  const { getTotalDonations } = props;
  return (
    <h1>
      Lahjoitukset yhteensä: <b>{`${formatEurAmount(getTotalDonations())}`}</b>€
    </h1>
  );
};

export { TotalDonations };
