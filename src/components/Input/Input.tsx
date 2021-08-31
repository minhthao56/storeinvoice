import React from "react";
import { SvgSearch } from "../../assets/svg";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import "./Input.scss";

export const Input: React.FC<IInput> = ({
  value,
  onChange,
  id,
  name,
  placeholder,
  error,
  label,
  hasIconSearch,
  className,
  marginLeft,
  marginBottom,
  type,
  onKeyDown,
  lang,
}) => {
  return (
    <div className={`input ${className}`} style={{ marginLeft, marginBottom }}>
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}
      <div className="input__main">
        <div className="input__container">
          <input
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            placeholder={placeholder}
            type={type}
            onKeyDown={onKeyDown}
            lang={lang}
          />
          {hasIconSearch && <SvgSearch />}
        </div>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
};
