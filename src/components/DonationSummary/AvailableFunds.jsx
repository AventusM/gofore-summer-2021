import React from "react";

import { formatEurAmount } from "../../utils";

const AvailableFunds = (props) => {
  const { getAvailableFunds } = props;
  return (
    <h4>
      Kohdentamattomat varat: <b>{`${formatEurAmount(getAvailableFunds())}`}</b>
      €
    </h4>
  );
};

export { AvailableFunds };
