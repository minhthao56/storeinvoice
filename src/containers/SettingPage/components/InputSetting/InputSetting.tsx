import React from "react";
import { SvgPlus } from "../../../../assets/svg";
import { Button, Input } from "../../../../components";
import "./InputSetting.scss";

export const InputSetting: React.FC<IInputSetting> = ({ onAdd, ...props }) => {
  return (
    <div className="input-setting">
      <Input className="input-setting__input" {...props} />
      <Button isBig className="input-setting__btn" onClick={onAdd}>
        <SvgPlus fill="white" />
      </Button>
    </div>
  );
};
