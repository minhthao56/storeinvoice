import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import { Alert, BoxShadow, Button, Select } from "../../components";
import { ImageTimeStore } from "../../constants/images";
import {
  optionGroupMonth,
  optionMonths,
  optionTypeStore,
  optionYears,
} from "../../constants/selections";
import "./ChooseTypeStorePage.scss";

export const ChooseTypeStorePage = () => {
  const history = useHistory();

  const [valueType, setValueType] = useState(2);
  const [valueYear, setValueYear] = useState(0);
  const [valueRankMonth, setValueRankMonth] = useState(0);

  const handleGoToInvoid = () => {
    history.push({
      pathname: "/invoice-type",
      state: {
        month: valueType === 1 ? valueRankMonth : undefined,
        groupmonth: valueType === 2 ? valueRankMonth : undefined,
        year: valueYear,
      },
    });
  };

  return (
    <div className="choose-type">
      <BoxShadow className="choose-type__container">
        <h3>CHỌN KỲ LƯU TRỮ</h3>
        <Select
          placeholder="Chọn kì"
          label="Chọn kì"
          className="choose-type__input"
          options={optionTypeStore}
          value={valueType}
          onSelect={(item) => setValueType(item.id)}
        />
        <Select
          placeholder="Chọn tháng/quý"
          label="Chọn tháng/quý"
          className="choose-type__input"
          options={valueType === 1 ? optionMonths : optionGroupMonth}
          value={valueRankMonth}
          onSelect={(item) => setValueRankMonth(item.id)}
        />
        <Select
          placeholder="Chọn năm"
          label="Chọn năm"
          className="choose-type__input"
          options={optionYears}
          value={valueYear}
          onSelect={(item) => setValueYear(item.id)}
        />
        <Button isBig onClick={handleGoToInvoid} className="choose-type__btn">
          Mở
        </Button>
      </BoxShadow>
      <img alt="" src={ImageTimeStore} className="choose-type__img" />
    </div>
  );
};
