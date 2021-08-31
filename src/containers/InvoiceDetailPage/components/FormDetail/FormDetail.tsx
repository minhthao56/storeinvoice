import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";

import {
  Button,
  Input,
  ModalConfirm,
  Select,
  Textarea,
} from "../../../../components";
import { optionTypeInvoid } from "../../../../constants/selections";
import "./FormDetail.scss";
import { InvoiceEvent } from "../../../../constants/event";

export const FromDetail: React.FC<IFromDetail> = ({
  invoice,
  handleSubmit,
}) => {
  const [message, setMessage] = useState("");

  const history = useHistory();
  const {
    invoicenumber,
    invoicetemplate,
    invoicedate,
    namebuyer,
    note,
    status,
    invoicesymbol,
    nameseller,
  } = invoice;

  const formik = useFormik({
    initialValues: {
      invoicenumber: invoicenumber || "",
      invoicetemplate: invoicetemplate || "",
      invoicedate: moment(
        invoicedate ? new Date(invoicedate) : new Date()
      ).format("YYYY-MM-DD"),
      namebuyer: namebuyer || "",
      note: note || "",
      status: status || 0,
      invoicesymbol: invoicesymbol || "",
      nameseller: nameseller || "",
    },

    enableReinitialize: true,
    onSubmit: (values: any) => {
      values.invoicedate = new Date(values.invoicedate);
      return handleSubmit(values);
    },
  });

  // handleResultDeleteOneInvoice
  const handleResultDeleteOneInvoice = (_: any, data: { result: number }) => {
    console.log("handleResultDeleteOneInvoice");

    if (data && data.result) {
      history.replace("/");
    } else {
      alert("Đã có lỗi xảy ra");
    }
  };

  useEffect(() => {
    apiElectron.on(
      InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
      handleResultDeleteOneInvoice
    );
    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteOneInvoice
      );
    };
  }, []);

  return (
    <Fragment>
      <form className="form-detail__form" onSubmit={formik.handleSubmit}>
        <div className="form-detail__block">
          <Select
            placeholder="Loại hóa đơn"
            label="Loại hóa đơn"
            value={formik.values.status}
            options={optionTypeInvoid}
            onSelect={(item) => formik.setFieldValue("status", item.id)}
            className="form-detail__input"
          />
          <Input
            placeholder="Kí hiệu HĐ"
            label="Kí hiệu HĐ"
            marginLeft={8}
            id="invoicesymbol"
            name="invoicesymbol"
            onChange={formik.handleChange}
            value={formik.values.invoicesymbol}
            className="form-detail__input"
          />
        </div>
        <div className="form-detail__block">
          <Input
            placeholder="Mã HĐ"
            label="Kí hiệu HD"
            id="invoicenumber"
            name="invoicenumber"
            onChange={formik.handleChange}
            value={formik.values.invoicenumber}
            className="form-detail__input"
          />
          <Input
            placeholder="Số HĐ"
            label="Số HĐ"
            marginLeft={8}
            id="invoicetemplate"
            name="invoicetemplate"
            onChange={formik.handleChange}
            value={formik.values.invoicetemplate}
            className="form-detail__input"
          />
        </div>
        <Input
          placeholder="Ngày hoá đơn"
          label="Ngày hoá đơn"
          marginBottom={32}
          className="form-detail__input"
          id="invoicedate"
          name="invoicedate"
          onChange={formik.handleChange}
          value={formik.values.invoicedate}
          type="date"
        />
        <Input
          placeholder="Khách hàng"
          label="Khách hàng"
          marginBottom={32}
          className="form-detail__input"
          id="namebuyer"
          name="namebuyer"
          onChange={formik.handleChange}
          value={formik.values.namebuyer}
        />
        <Input
          placeholder="Người bán"
          label="Người bán"
          marginBottom={32}
          className="form-detail__input"
          id="nameseller"
          name="nameseller"
          onChange={formik.handleChange}
          value={formik.values.nameseller}
        />
        <Textarea
          placeholder="Ghi chú"
          label="Ghi chú"
          onChange={formik.handleChange}
          value={formik.values.note}
          name="note"
          id="note"
        />
        <div className="form-detail__actions">
          <Button
            isBig
            isRed
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMessage("Bạn có chắc muốn xóa hóa đơn này không?");
            }}
            type="button"
          >
            Xóa HĐ
          </Button>
          <Button isBig type="submit">
            Lưu
          </Button>
        </div>
      </form>
      <ModalConfirm
        isOpen={message}
        message={message}
        setOpen={setMessage}
        onCancel={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setMessage("");
        }}
        onOK={(e) => {
          e.stopPropagation();
          e.preventDefault();
          apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
            id: invoice.id,
          });
        }}
      />
    </Fragment>
  );
};
