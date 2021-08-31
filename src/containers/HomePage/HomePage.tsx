import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LabelTitle,
  BoxShadow,
  ModalConfirm,
  Pagination,
} from "../../components";
import { InvoiceEvent, MediaEvent } from "../../constants/event";
import { CompanyContext } from "../../store/reducers";
import {
  FormFilter,
  ModalDate,
  ModalPreviewInvoice,
  Table,
} from "./components";

import "./HomePage.scss";

export const HomePage = () => {
  const { state } = useLocation<IParamsFilterHome>();

  const {
    state: { companyData },
  } = useContext(CompanyContext);

  //useState
  const [dataTable, setDataTable] = useState<Array<IResInvoice>>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [messageConfirm, setMessageConfirm] = useState("");
  const [invoiceId, setInvoiceId] = useState(0);
  const [linkPDF, setLinkPDF] = useState("");
  const [isOpenFile, setIsOpenFile] = useState(false);

  //handleAddFilePDF
  const handleAddFilePDF = (date: any) => {
    console.log(new Date(date));
    apiElectron.sendMessages(MediaEvent.STORE_MEDIA, {
      typeinvoice: state ? state.typeinvoice : 10,
      companyid: companyData.id,
      datechoose: date ? new Date(date) : new Date(),
    });
  };

  //handleListenerGetInvoice
  const handleGetAllInvoices = () => {
    apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
      companyid: companyData.id,
      page,
      typeinvoice: state ? state.typeinvoice : 10,
      groupmonth: (state && state.groupmonth) || undefined,
      month: (state && state.month) || undefined,
      year: (state && state.year) || undefined,
    });
    console.log({
      companyid: companyData.id,
      page,
      typeinvoice: state ? state.typeinvoice : 10,
      groupmonth: (state && state.groupmonth) || undefined,
      month: (state && state.month) || undefined,
      year: (state && state.year) || undefined,
    });
  };

  //handleListenerGetInvoice
  const handleListenerGetInvoice = (_: any, data: IResGetAllInvoices) => {
    if (data.content.invoices) {
      setDataTable(data.content.invoices);
      setPage(data.content.pageconfig.page);
      setTotalPage(data.content.pageconfig.totalpage);
      // console.log("data", data);
    }
  };

  //handleResultStoreMedia
  const handleResultStoreMedia = (_: any, data: { result: number }) => {
    if (data.result) {
      let time = setTimeout(() => {
        handleGetAllInvoices();
        clearTimeout(time);
        setIsOpenFile(false);
      }, 1000);
    }
  };
  useEffect(() => {
    handleGetAllInvoices();
    //RESULT_GET_ALL_INVOICES
    apiElectron.on(
      InvoiceEvent.RESULT_GET_ALL_INVOICES,
      handleListenerGetInvoice
    );
    //RESULT_STORE_MEDIA
    apiElectron.on(MediaEvent.RESULT_STORE_MEDIA, handleResultStoreMedia);

    //removeListener
    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_GET_ALL_INVOICES,
        handleListenerGetInvoice
      );

      apiElectron.removeListener(
        MediaEvent.RESULT_STORE_MEDIA,
        handleResultStoreMedia
      );
    };
  }, []);

  //handleResultDeleteInvoice
  const handleResultDeleteInvoice = (_: any, data: IResDeleteOneInvoice) => {
    if (data.content && data.result) {
      const deleteInvoice = dataTable.filter(
        (item) => item.id !== data.content.deleteid
      );
      setDataTable(deleteInvoice);
    }
    setMessageConfirm("");
  };
  useEffect(() => {
    //RESULT_DELETE_ONE_INVOICE
    apiElectron.on(
      InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
      handleResultDeleteInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteInvoice
      );
    };
  }, [dataTable]);

  //handleConfirmDeleteInvoice
  const handleConfirmDeleteInvoice = () => {
    apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
      id: invoiceId,
    });
  };

  //handleFilterVoice
  const handleFilterVoice = (values: ISubmitFilter) => {
    const {
      groupmonth,
      invoicedate,
      invoicenumber,
      invoicesymbol,
      invoicetemplate,
      month,
      namebuyer,
      year,
    } = values;
    // Khong filter được ở đây?
    apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
      companyid: companyData.id,
      page,
      typeinvoice: state ? state.typeinvoice : 10,
      groupmonth: groupmonth || undefined,
      month: month || undefined,
      year: year || undefined,
      invoicedate: invoicedate || undefined,
      invoicenumber: invoicenumber || undefined,
      invoicesymbol: invoicesymbol || undefined,
      invoicetemplate: invoicetemplate || undefined,
      namebuyer: namebuyer || undefined,
    });
  };

  console.log("dataTable", dataTable);

  return (
    <div className="home-page">
      <BoxShadow marginBottom={42}>
        <FormFilter
          year={state?.year}
          month={state?.month}
          groupmonth={state?.groupmonth}
          handleSubmitForm={handleFilterVoice}
        />
      </BoxShadow>
      <BoxShadow>
        <LabelTitle
          title={`Danh sách hoá đơn ${
            state && state.typeinvoice === 20 ? "mua vào" : "bán ra"
          } `}
          marginBottom={16}
          hasBtnAdd
          handleBtnAdd={() => setIsOpenFile(true)}
        />
        <Table
          dataTable={dataTable}
          handleDeleteInvoice={(id) => {
            setMessageConfirm("Bạn có muốn xóa hóa đơn này không?");
            setInvoiceId(id);
          }}
          handlePreviewPDF={(link) => setLinkPDF(link)}
        />
        {totalPage !== 1 && (
          <Pagination
            totalPage={totalPage}
            page={page}
            handleSelectNumber={(pageInside) => {
              setPage(pageInside);

              apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                companyid: companyData.id,
                page: pageInside,
              });
            }}
            onBack={() => {
              if (page > 0) {
                setPage((page) => page - 1);
                apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                  companyid: companyData.id,
                  page: page - 1,
                });
              }
            }}
            onNext={() => {
              if (page < totalPage) {
                setPage((page) => page + 1);
                apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                  companyid: companyData.id,
                  page: page + 1,
                });
              }
            }}
          />
        )}
      </BoxShadow>
      <ModalConfirm
        isOpen={messageConfirm}
        message={messageConfirm}
        setOpen={setMessageConfirm}
        onCancel={() => setMessageConfirm("")}
        onOK={handleConfirmDeleteInvoice}
      />
      <ModalPreviewInvoice
        isOpen={linkPDF}
        link={linkPDF}
        setOpen={setLinkPDF}
      />
      <ModalDate
        onChoosePDF={handleAddFilePDF}
        isOpen={isOpenFile}
        setOpen={setIsOpenFile}
        onClose={() => setIsOpenFile(false)}
      />
    </div>
  );
};
