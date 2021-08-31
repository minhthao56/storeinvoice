import React from "react";
import "./Logo.scss";

export const Logo: React.FC<ILogo> = ({ marginRight }) => {
  return (
    <div className="logo" style={{ marginRight }}>
      PDF
    </div>
  );
};
