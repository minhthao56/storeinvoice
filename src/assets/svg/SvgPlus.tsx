import React from "react";

export const SvgPlus: React.FC<ISvg> = ({ fill }) => {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 13v6h-2v-6H5v-2h6V5h2v6h6v2h-6z" fill={fill || "#2E3A59"} />
    </svg>
  );
};
