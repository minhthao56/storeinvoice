import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { Alert, BoxShadow, Button, Input } from "../../components";
import { CompanyEvent } from "../../constants/event";
import { ImageCompanyProfile } from "../../constants/images";
import { CompanyContext } from "../../store/reducers";

import "./CompanyProfilePage.scss";

export const CompanyProfilePage = () => {
  const [message, setMessage] = useState("");
  const {
    state: { companyData },
  } = useContext(CompanyContext);

  const RegisterSchema = Yup.object().shape({
    taxcode: Yup.string().required("Vui lòng nhập mã số thuế"),
    name: Yup.string().required("Vui lòng nhập tên công ty"),
    email: Yup.string().email("Email không đúng"),
  });

  const formik = useFormik({
    initialValues: {
      taxcode: companyData.taxcode || "",
      name: companyData.name || "",
      address: companyData.address || "",
      email: companyData.email || "",
      phone: companyData.phone || "",
      fax: companyData.fax || "",
      province: companyData.province || "",
      district: companyData.district || "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      apiElectron.sendMessages(CompanyEvent.UPDATE_ONE_COMPANY, {
        id: companyData.id,
        ...values,
      });
    },
  });

  //handleResultUpdateOneCompany
  const handleResultUpdateOneCompany = (_: any, data: { id: number }) => {
    if (data) {
      let time = setTimeout(() => {
        setMessage("Cập nhật thông tin thành công");
        clearTimeout(time);
      }, 100);
    }
  };

  useEffect(() => {
    //RESULT_GET_ONE_COMPANY
    apiElectron.on(
      CompanyEvent.RESULT_UPDATE_ONE_COMPANY,
      handleResultUpdateOneCompany
    );
    return () => {
      apiElectron.removeListener(
        CompanyEvent.RESULT_UPDATE_ONE_COMPANY,
        handleResultUpdateOneCompany
      );
    };
  }, []);

  return (
    <div className="company-profile">
      <BoxShadow className="company-profile__container">
        <h3>THÔNG TIN CÔNG TY</h3>
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="company-profile__input"
            placeholder="MST"
            id="taxcode"
            name="taxcode"
            onChange={formik.handleChange}
            value={formik.values.taxcode}
            error={formik.touched.taxcode && formik.errors.taxcode}
          />
          <Input
            className="company-profile__input"
            placeholder="Tên công ty"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            className="company-profile__input"
            placeholder="Địa chỉ"
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <Input
            className="company-profile__input"
            placeholder="Quận/huyện"
            id="district"
            name="district"
            onChange={formik.handleChange}
            value={formik.values.district}
          />
          <Input
            className="company-profile__input"
            placeholder="Tỉnh/Thành phố"
            id="province"
            name="province"
            onChange={formik.handleChange}
            value={formik.values.province}
          />
          <Input
            className="company-profile__input"
            placeholder="Điện thoại"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            className="company-profile__input"
            placeholder="Fax"
            id="fax"
            name="fax"
            onChange={formik.handleChange}
            value={formik.values.fax}
          />
          <Input
            className="company-profile__input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="company-profile__actions">
            <Button isBig isRed type="button">
              Trở về
            </Button>
            <Button isBig type="submit">
              Lưu
            </Button>
          </div>
        </form>
      </BoxShadow>
      <div className="company-profile__img">
        <img src={ImageCompanyProfile} />
      </div>
      <Alert isOpen={message} messages={message} setOpen={setMessage} />
    </div>
  );
};
