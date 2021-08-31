interface IRouter {
  component: any;
  layout: any;
  exact?: boolean;
  path?: string;
  header?: any;
  title?: string;
}

interface IParamsFilterHome {
  month: number;
  groupmonth: number;
  year: number;
  typeinvoice: number;
}

interface IParamsFilterTypeInvoice {
  month: number;
  groupmonth: number;
  year: number;
}
