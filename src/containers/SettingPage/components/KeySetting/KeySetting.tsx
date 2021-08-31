import React from "react";
import { SvgClose } from "../../../../assets/svg";
import "./KeySetting.scss";

export const KeySetting: React.FC<IKeySetting> = ({ title, onDelete }) => {
  return (
    <div className="key-setting">
      <div className="key-setting__text">{title}</div>
      <div onClick={onDelete}>
        <SvgClose fill="#db2424" />
      </div>
    </div>
  );
};
