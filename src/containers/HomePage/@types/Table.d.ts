interface ITable {
  dataTable?: Array<IResInvoice>;
  handleDeleteInvoice?: (id: number) => void;
  handlePreviewPDF?: (link: string) => void;
}
