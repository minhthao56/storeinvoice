import React from "react";

export const SvgClose: React.FC<ISvg> = ({ fill }) => {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <path
        d="M14.658 4.167L10 8.825 5.342 4.167 4.167 5.342 8.825 10l-4.658 4.658 1.175 1.175L10 11.175l4.658 4.658 1.175-1.175L11.175 10l4.658-4.658-1.175-1.175z"
        fill={fill || "#F2F2F2"}
      />
    </svg>
  );
};
