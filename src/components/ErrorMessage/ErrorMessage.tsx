import React from "react";
import "./ErrorMessage.scss";

export const ErrorMessage: React.FC<ErrorMessage> = ({ error }) => {
  return (
    <div className="error-message" style={{ opacity: error ? 1 : 0 }}>
      {error}
    </div>
  );
};
