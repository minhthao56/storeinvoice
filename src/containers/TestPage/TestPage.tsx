import React, { useEffect, useState } from "react";
import "./TestPage.scss";
import moment from "moment";
import {
  CompanyEvent,
  ConfigEvent,
  InvoiceEvent,
  MediaEvent,
} from "../../constants/event";

export const TestPage: React.FC = () => {
  const [companies, setCompanies] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [companyDeleteId, setCompanyDeleteId] = useState<number>(0);
  const [invoiceDeleteId, setInvoiceDeleteId] = useState<number>(0);
  const [configDeleteId, setConfigDeleteId] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    apiElectron.on(CompanyEvent.RESULT_GET_ALL_COMPANIES, (_, data) => {
      if (data.result === 1) {
        setCompanies(data.content.companies);
        console.log(data);
      } else {
        console.log(data?.message);
      }
    });

    apiElectron.on(CompanyEvent.RESULT_INSERT_ONE_COMPANY, (_, data) => {
      console.log(data);
    });

    apiElectron.on(CompanyEvent.RESULT_DELETE_ONE_COMPANY, (_, data) => {
      console.log(data);
    });

    apiElectron.on(CompanyEvent.RESULT_GET_ONE_COMPANY, (_, data) => {
      console.log(data);
    });

    apiElectron.on(InvoiceEvent.RESULT_GET_ALL_INVOICES, (_, data) => {
      if (data.result === 1) {
        setInvoices(data.content.invoices);
        console.log(data);
      } else {
        console.log(data?.message);
      }
    });

    apiElectron.on(InvoiceEvent.RESULT_DELETE_ONE_INVOICE, (_, data) => {
      console.log(data);
    });

    apiElectron.on(ConfigEvent.RESULT_GET_ALL_CONFIGS, (_, data) => {
      if (data.result === 1) {
        setConfigs(data.content.configs);
        console.log(data);
      } else {
        console.log(data?.message);
      }
    });

    apiElectron.on(
      InvoiceEvent.RESULT_UPDATE_ONE_INVOICE,
      (_: any, data: any) => {
        console.log("dât", data);
      }
    );
  }, []);

  return (
    <div className="test">
      <h1>Test</h1>

      <button
        onClick={() => {
          let company = {
            taxcode: "0123456789",
            name: "Qwerty 001",
            address: "001 ABC Qwerty",
            email: "qwerty001@gmail.com",
            phone: "0123456789",
            fax: "0987654321",
            province: "TP. HCM",
            district: "Quận 1",
          };

          console.log(company);
          apiElectron.sendMessages(CompanyEvent.INSERT_ONE_COMPANY, company);
        }}
      >
        INSERT COMPANY
      </button>

      <button
        onClick={() => {
          let company = {
            id: 2,
            taxcode: "0123456789",
            name: "Qwerty 002",
            address: "002 ABC Qwerty",
            email: "qwerty002@gmail.com",
            phone: "0123456789",
            fax: "0987654321",
            province: "TP. HCM",
            district: "Quận 1",
          };

          apiElectron.sendMessages(CompanyEvent.UPDATE_ONE_COMPANY, company);
        }}
      >
        UPDATE COMPANY
      </button>

      <input
        type="text"
        value={companyDeleteId}
        onChange={(e) => setCompanyDeleteId(Number(e.target.value || 0))}
      />

      <button
        onClick={() => {
          apiElectron.sendMessages(CompanyEvent.DELETE_ONE_COMPANY, {
            id: companyDeleteId,
          });
        }}
      >
        DELETE COMPANY
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(CompanyEvent.GET_ALL_COMPANIES);
        }}
      >
        GET ALL COMPANIES
      </button>

      {companies.map((company: any, i) => {
        return <p key={company.id}>{JSON.stringify(company)}</p>;
      })}

      <button
        onClick={() => {
          apiElectron.sendMessages(CompanyEvent.GET_ONE_COMPANY, {
            taxcode: "0123456789",
          });
        }}
      >
        GET COMPANY BY TAX
      </button>

      <button
        onClick={() => {
          let invoice = {
            invoicesymbol: "123",
            invoicetemplate: "ABC/123",
            invoicenumber: "745218",
            invoicedate: new Date("2021-08-21"),
            note: "Oke nhé",
            namepdf: "pdf1.pdf",
          };

          console.log(invoice);
          apiElectron.sendMessages(InvoiceEvent.INSERT_ONE_INVOICE, invoice);
        }}
      >
        INSERT INVOICE
      </button>

      <button
        onClick={() => {
          let invoice = {
            id: 3,
            invoicesymbol: "123456",
            invoicetemplate: "ABC/123",
            invoicenumber: "745218",
            invoicedate: new Date("2021-08-21"),
            note: "Oke nhé",
            // namepdf: "pdf1.pdf",
          };

          apiElectron.sendMessages(InvoiceEvent.UPDATE_ONE_INVOICE, invoice);
        }}
      >
        UPDATE INVOICE
      </button>

      <input
        type="text"
        value={invoiceDeleteId}
        onChange={(e) => setInvoiceDeleteId(Number(e.target.value || 0))}
      />

      <button
        onClick={() => {
          apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
            id: invoiceDeleteId,
          });
        }}
      >
        DELETE INVOICE
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
            // groupmonth: 30,
          });
        }}
      >
        GET ALL INVOICES
      </button>

      {invoices.map((invoice: any, i) => {
        return (
          <div key={invoice.id}>
            <p>{JSON.stringify(invoice)}</p>
            <p>
              {moment(new Date(invoice.invoicedate)).format("DD/MM/yyyy HH:mm")}
            </p>
          </div>
        );
      })}

      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value || "")}
      />

      <button
        onClick={() => {
          let input = {
            typeinvoice: 10,
          };

          apiElectron.sendMessages(MediaEvent.STORE_MEDIA, input);
        }}
      >
        STORE FILE
      </button>

      <button
        onClick={() => {
          let config = {
            title: "Đơn vị mua hàng",
            type: 20,
          };

          apiElectron.sendMessages(ConfigEvent.INSERT_ONE_CONFIG, config);
        }}
      >
        INSERT CONFIG
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(ConfigEvent.GET_ALL_CONFIGS, {
            type: 20,
          });
        }}
      >
        GET ALL CONFIGS
      </button>

      {configs.map((config: any, i) => {
        return <p key={config.id}>{JSON.stringify(config)}</p>;
      })}

      <input
        type="text"
        value={configDeleteId}
        onChange={(e) => setConfigDeleteId(Number(e.target.value || 0))}
      />

      <button
        onClick={() => {
          apiElectron.sendMessages(ConfigEvent.DELETE_ONE_CONFIG, {
            id: configDeleteId,
          });
        }}
      >
        DELETE CONFIG
      </button>

      <button
        onClick={() => {
          let config = {
            title: "Đơn vị:",
            type: 10,
          };

          apiElectron.sendMessages(ConfigEvent.UPDATE_ONE_CONFIG, config);
        }}
      >
        UPDATE CONFIG
      </button>
    </div>
  );
};
