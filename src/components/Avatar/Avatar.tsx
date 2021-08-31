import React from "react";
import "./Avatar.scss";

export const Avatar: React.FC<IAvatar> = ({ marginRight, marginLeft }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://picsum.photos/200)`,
        marginRight,
        marginLeft,
      }}
      className="avatar"
    />
  );
};
