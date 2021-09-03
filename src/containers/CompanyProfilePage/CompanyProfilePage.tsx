import { useFormik } from "formik";
import React, { Fragment, useContext, useEffect, useState } from "react";
import * as Yup from "yup";

import { Alert, BoxShadow, Button, Input, Loader } from "../../components";
import { AutoUpdateEvent, CompanyEvent } from "../../constants/event";
import { CompanyContext } from "../../store/reducers";

import "./CompanyProfilePage.scss";

export const CompanyProfilePage = () => {
  const [message, setMessage] = useState("");
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [progressInfo, setProgressInfo] = useState({
    percent: 0,
    bytesPerSecond: 0,
  });
  const [status, setStatus] = useState("");
  const [version, setVersion] = useState(0);

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
  //handleUpdateAvailable
  const handleUpdateAvailable = () => {
    let time = setTimeout(() => {
      setMessage("Đang thực hiện tải bản nâng cấp phần mềm mới");
      clearTimeout(time);
    }, 100);
    setLoadingCheck(false);
  };

  //handleUpdateNotAvailable
  const handleUpdateNotAvailable = () => {
    let time = setTimeout(() => {
      setMessage("Chưa có bản nâng cập phần mềm mới");
      clearTimeout(time);
    }, 100);

    setLoadingCheck(false);
  };

  //handleDownloadProgress
  const handleDownloadProgress = (
    _: any,
    data: { percent: any; bytesPerSecond: any }
  ) => {
    setProgressInfo(data);
    setLoadingCheck(false);
    setStatus("progress");
  };

  //handleResultGetVersion
  const handleResultGetVersion = (_: any, data: { version: any }) => {
    setVersion(data.version);
  };

  useEffect(() => {
    //RESULT_GET_ONE_COMPANY
    apiElectron.on(
      CompanyEvent.RESULT_UPDATE_ONE_COMPANY,
      handleResultUpdateOneCompany
    );

    //UPDATE_AVAILABLE
    apiElectron.on(AutoUpdateEvent.UPDATE_AVAILABLE, handleUpdateAvailable);
    //UPDATE_NOT_AVAILABLE

    apiElectron.on(
      AutoUpdateEvent.UPDATE_NOT_AVAILABLE,
      handleUpdateNotAvailable
    );
    //DOWNLOAD_PROGRESS
    apiElectron.on(AutoUpdateEvent.DOWNLOAD_PROGRESS, handleDownloadProgress);

    //GET_VERSION
    apiElectron.sendMessages(AutoUpdateEvent.GET_VERSION);

    //RESULT_GET_VERSION
    apiElectron.on(AutoUpdateEvent.RESULT_GET_VERSION, handleResultGetVersion);

    return () => {
      apiElectron.removeListener(
        CompanyEvent.RESULT_UPDATE_ONE_COMPANY,
        handleResultUpdateOneCompany
      );
      apiElectron.removeListener(
        AutoUpdateEvent.UPDATE_AVAILABLE,
        handleUpdateAvailable
      );
      apiElectron.removeListener(
        AutoUpdateEvent.DOWNLOAD_PROGRESS,
        handleDownloadProgress
      );
      apiElectron.removeListener(
        AutoUpdateEvent.UPDATE_NOT_AVAILABLE,
        handleUpdateNotAvailable
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
      <BoxShadow className="company-profile__update">
        <h3>CẬP NHẬT PHẦN MỀM</h3>
        {status === "progress" ? (
          <Fragment>
            <p>{`Đang tải...${progressInfo.percent}%`}</p>
            <div className="company-profile__progress-bar">
              <div
                className="company-profile__progress"
                style={{ width: `${progressInfo.percent}` }}
              />
            </div>
            <span>{`Tốc độ: ${progressInfo.bytesPerSecond} kb/s`}</span>
          </Fragment>
        ) : // <Button
        //   isExtraBig
        //   disabled={loadingCheck}
        //   onClick={() => {
        //     apiElectron.sendMessages(AutoUpdateEvent.REQUIRE_CHECK_UPDATE);
        //     setLoadingCheck(true);
        //   }}
        // >
        //   Kiểm tra cập nhật
        // </Button>
        null}
        <h4>{`Bản phần mềm hiện tại: ${version}`}</h4>
        {/* {loadingCheck && <Loader />} */}
      </BoxShadow>
      <Alert isOpen={message} messages={message} setOpen={setMessage} />
    </div>
  );
};
