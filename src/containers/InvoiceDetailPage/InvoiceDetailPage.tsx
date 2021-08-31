import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, InvoicePreview } from "../../components";

import { InvoiceEvent } from "../../constants/event";
import { FromDetail } from "./components";
import "./InvoiceDetailPage.scss";

export const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [message, setMessage] = useState("");

  const [invoice, setInvoice] = useState<IResInvoice>({
    createdate: 0,
    id: 0,
    invoicedate: 0,
    invoicenumber: "",
    invoicesymbol: "",
    invoicetemplate: "",
    linkpdf: "",
    month: "",
    namebuyer: "",
    namepdf: "",
    nameseller: "",
    note: "",
    status: 0,
    typeinvoice: 0,
    updatedate: 0,
  });

  //handleResultGetOneInvoice
  const handleResultGetOneInvoice = (_: any, data: IResGetOneInvoice) => {
    if (data.content.invoice) {
      setInvoice(data.content.invoice);
    }
  };

  //handleGetOneInvoice
  const handleGetOneInvoice = () => {
    apiElectron.sendMessages(InvoiceEvent.GET_ONE_INVOICE, {
      id: parseInt(id || ""),
    });
  };

  useEffect(() => {
    if (id) {
      handleGetOneInvoice();
      apiElectron.on(
        InvoiceEvent.RESULT_GET_ONE_INVOICE,
        handleResultGetOneInvoice
      );
    }

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.GET_ONE_INVOICE,
        handleResultGetOneInvoice
      );
    };
  }, [id]);

  //handleUpdateInvoice
  const handleUpdateInvoice = (values: any) => {
    apiElectron.sendMessages(InvoiceEvent.UPDATE_ONE_INVOICE, {
      ...values,
      id: invoice.id,
    });
  };

  //handleResultUpdateInvoice
  const handleResultUpdateInvoice = (_: any, data: any) => {
    console.log("handleResultUpdateInvoice");

    if (data && data.result) {
      handleGetOneInvoice();
      let time = setTimeout(() => {
        setMessage("Cập nhật hóa đơn thành công.");
        clearTimeout(time);
      }, 100);
    }
  };

  useEffect(() => {
    apiElectron.on(
      InvoiceEvent.RESULT_UPDATE_ONE_INVOICE,
      handleResultUpdateInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_UPDATE_ONE_INVOICE,
        handleResultUpdateInvoice
      );
    };
  }, []);

  return (
    <div className="invoice-detail">
      <div className="invoice-detail__form">
        <h3>THÔNG TIN</h3>
        <FromDetail invoice={invoice} handleSubmit={handleUpdateInvoice} />
      </div>

      <div className="invoice-detail__preview">
        <h3>XEM HÓA ĐƠN</h3>
        <InvoicePreview link={invoice.linkpdf} />
      </div>
      <Alert isOpen={message} messages={message} setOpen={setMessage} />
    </div>
  );
};
