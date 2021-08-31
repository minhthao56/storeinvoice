import React, { useEffect, useRef, useState } from "react";
import { SvgDropdown } from "../../assets/svg";
import { useClickOutside } from "../../hooks";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import "./Select.scss";

export const Select: React.FC<ISelect> = ({
  error,
  placeholder,
  label,
  className,
  options,
  onSelect,
  value,
}) => {
  const [isShowBody, setIsShowBody] = useState(false);
  const [valueInside, setValueInside] = useState("");

  const bodyRef = useRef<HTMLDivElement>(null);

  useClickOutside(bodyRef, () => {
    setIsShowBody(!isShowBody);
  });

  const handleSelectItem = (item: { id: number; title: string }) => {
    setIsShowBody(false);
    if (onSelect) {
      return onSelect(item);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      if (typeof value === "number") {
        // find title by value
        const findOption = options.find((item) => item.id === value);
        if (findOption) {
          setValueInside(findOption.title);
        } else {
          setValueInside("");
        }
      } else {
        setValueInside(value.title);
      }
    }
  }, [value]);

  return (
    <div className={`select ${className}`}>
      <div className="select__label">{label}</div>
      <div className="select__container">
        <div
          className="select__header"
          onClick={() => setIsShowBody(!isShowBody)}
        >
          <p>{valueInside || placeholder}</p>
          <SvgDropdown />
        </div>
        {isShowBody && (
          <div className="select__body" ref={bodyRef}>
            {options.map((item, i) => {
              return (
                <div
                  key={i}
                  className="select__item"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};
