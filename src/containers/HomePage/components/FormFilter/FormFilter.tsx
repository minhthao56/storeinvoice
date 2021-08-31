import React, { useState } from "react";
import { useFormik } from "formik";

import { Button, Input, LabelTitle, Select } from "../../../../components";

import "./FormFilter.scss";
import {
  optionGroupMonth,
  optionMonths,
  optionTypeStore,
  optionYears,
} from "../../../../constants/selections";

export const FormFilter: React.FC<IFormFilter> = ({
  groupmonth,
  month,
  year,
  handleSubmitForm,
}) => {
  const [typeStore, setTypeStore] = useState(1);
  const formik = useFormik({
    initialValues: {
      invoicesymbol: "",
      invoicetemplate: "",
      invoicenumber: "",
      invoicedate: "",
      namebuyer: "",
      month: month || 0,
      groupmonth: groupmonth || 0,
      year: year || 0,
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
      if (values.invoicedate) {
        values.invoicedate = new Date(values.invoicedate);
      }
      return handleSubmitForm(values);
    },
  });

  return (
    <form className="form-filter" onSubmit={formik.handleSubmit}>
      <LabelTitle
        title="Tìm kiếm"
        hasBottomLine
        secondContent={
          <Button isBig type="submit">
            Tìm kiếm
          </Button>
        }
        className="form-filter__title"
      />

      <div className="form-filter__container">
        <Input
          placeholder="Kí hiệu hóa đơn"
          label="Kí hiệu hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicesymbol}
          onChange={formik.handleChange}
          id="invoicesymbol"
          name="invoicesymbol"
        />
        <Input
          placeholder="Mã hóa đơn"
          label="Mã hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicetemplate}
          onChange={formik.handleChange}
          id="invoicetemplate"
          name="invoicetemplate"
        />
        <Input
          placeholder="Số hóa đơn"
          label="Số hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicenumber}
          onChange={formik.handleChange}
          id="invoicenumber"
          name="invoicenumber"
        />
        <Input
          placeholder="Ngày hóa đơn"
          label="Ngày hóa đơn"
          type="date"
          className="form-filter__input"
          value={formik.values.invoicedate}
          onChange={formik.handleChange}
          id="invoicedate"
          name="invoicedate"
        />
        <Input
          placeholder="Khách hàng"
          label="Khách hàng"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.namebuyer}
          onChange={formik.handleChange}
          id="namebuyer"
          name="namebuyer"
        />
        <Select
          placeholder="Chọn kì"
          label="Chọn kì"
          className="form-filter__input"
          options={optionTypeStore}
          value={typeStore}
          onSelect={(item) => setTypeStore(item.id)}
        />
        <Select
          placeholder="Chọn tháng/quý"
          label="Chọn tháng/quý"
          className="form-filter__input"
          options={typeStore === 1 ? optionMonths : optionGroupMonth}
        />
        <Select
          placeholder="Chọn năm"
          label="Chọn năm"
          className="form-filter__input"
          options={optionYears}
          value={formik.values.year}
          onSelect={(item) => formik.setFieldValue("year", item.id)}
        />
      </div>
    </form>
  );
};
