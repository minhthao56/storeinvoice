interface IResCompany {
  address: string;
  createdate: number;
  district: string;
  email: string;
  fax: string;
  id: number;
  name: string;
  phone: string;
  province: string;
  status: 10 | 20;
  taxcode: string;
  updatedate: number;
}

interface IResInvoice {
  createdate: number;
  id: number;
  invoicedate: number;
  invoicenumber: string;
  invoicesymbol: string;
  invoicetemplate: string;
  linkpdf: string;
  month: string;
  namebuyer: string;
  namepdf: string;
  nameseller: string;
  note: string;
  status: number;
  typeinvoice: number;
  updatedate: number;
}

interface IResConfig {
  createdate: number;
  id: number;
  status: number;
  title: string;
  type: number;
  updatedate: number;
}

interface IResPageconfig {
  page: number;
  pagesize: number;
  totalelement: number;
  totalpage: number;
}

interface IResGetOneCompany {
  content: {
    company?: IResCompany;
  };
  result: number;
}

interface IResGetAllCompanies {
  content: {
    companies: Array<IResCompany>;
  };
  result: number;
}

interface IResGetAllInvoices {
  content: {
    invoices?: Array<IResInvoice>;
    pageconfig: IResPageconfig;
  };
  result: number;
}

interface IResGetOneInvoice {
  content: {
    invoice?: IResInvoice;
  };
  result: number;
}

interface IResDeleteOneInvoice {
  content: { deleteid: number };
  result: 1;
}

interface IResGetAllConfigs {
  content: {
    configs?: Array<IResConfig>;
  };
  result: number;
}
