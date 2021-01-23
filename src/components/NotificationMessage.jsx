import React, { useContext } from "react";
import Alert from "react-bootstrap/Alert";

import { NotificationContext } from "../App";

const NotificationMessage = () => {
  const { message } = useContext(NotificationContext);

  if (message) {
    const messageVariant = message.split(":")[0];
    const notification = message.split(":")[1];
    return (
      <Alert style={{ marginTop: "35px" }} variant={messageVariant}>
        {notification}
      </Alert>
    );
  }

  return null;
};

export { NotificationMessage };
