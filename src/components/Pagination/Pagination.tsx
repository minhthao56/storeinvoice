import React from "react";
import { SvgArrowLeft, SvgArrowRight } from "../../assets/svg";
import "./Pagination.scss";

export const Pagination: React.FC<IPagination> = ({
  totalPage,
  page,
  handleSelectNumber,
  onBack,
  onNext,
}) => {
  return (
    <div className="pagination">
      <div className="pagination__btn" onClick={onBack}>
        <SvgArrowLeft />
      </div>
      {Array.from(Array(totalPage).keys()).map((_, i) => {
        return (
          <div
            key={i}
            className={
              page === i
                ? "pagination__btn pagination__btn--blue"
                : "pagination__btn"
            }
            onClick={() => {
              if (handleSelectNumber) {
                return handleSelectNumber(i);
              }
            }}
          >
            {i + 1}
          </div>
        );
      })}
      <div className="pagination__btn" onClick={onNext}>
        <SvgArrowRight />
      </div>
    </div>
  );
};
