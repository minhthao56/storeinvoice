import React from "react";
import { SvgCompany } from "../../../../assets/svg";
import { BoxShadow } from "../../../../components";
import { readMore } from "../../../../helpers";
import "./CompanyCard.scss";

export const CompanyCard: React.FC<ICompanyCard> = ({
  title,
  onClick,
  isSelected,
}) => {
  return (
    <BoxShadow
      className={
        isSelected ? "company-card company-card--selected" : "company-card"
      }
      onClick={onClick}
    >
      <SvgCompany />
      <p>{readMore({ maxLength: 10, string: title })}</p>
    </BoxShadow>
  );
};
