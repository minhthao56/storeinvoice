interface IFormFilter {
  month?: number;
  groupmonth?: number;
  year?: number;
  handleSubmitForm: (values: ISubmitFilter) => void;
}

interface ISubmitFilter {
  invoicesymbol: string;
  invoicetemplate: string;
  invoicenumber: string;
  invoicedate: string;
  namebuyer: string;
  month: number;
  groupmonth: number;
  year: number;
}
