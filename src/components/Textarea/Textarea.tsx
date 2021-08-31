import React, { FC } from "react";
import "./Textarea.scss";

export const Textarea: FC<ITextarea> = ({
  children,
  label,
  placeholder,
  value,
  onChange,
  id,
  name,
}) => {
  return (
    <div className="textarea">
      <label className="textarea__label" htmlFor={id}>
        {label}
      </label>
      <div className="textarea__container">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
        />
      </div>
    </div>
  );
};
