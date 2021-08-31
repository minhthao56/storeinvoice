const { InvoiceEvent } = require("../../constants/event");
const { invoiceService } = require("../database/index");

const { ipcMain } = require("electron");

// listener get companies
ipcMain.on(InvoiceEvent.GET_ALL_INVOICES, (event, filter) => {
  invoiceService.getInvoices(filter)
    .then((invoices) => {
      invoiceService.countInvoices(filter)
        .then((resultCount) => {
          event.reply(InvoiceEvent.RESULT_GET_ALL_INVOICES, {
            result: 1,
            content: {
              invoices,
              pageconfig: {
                page: filter.page,
                pagesize: filter.pagesize,
                totalelement: resultCount?.numline || 0,
                totalpage: Math.ceil((resultCount?.numline || 0) / filter.pagesize),
              }
            }
          })
        })
        .catch((err) => event.reply(InvoiceEvent.RESULT_GET_ONE_INVOICE, err));
    })
    .catch((err) => event.reply(InvoiceEvent.RESULT_GET_ALL_INVOICES, err));
});

// listener get one company
ipcMain.on(InvoiceEvent.GET_ONE_INVOICE, (event, { id }) => {
  invoiceService.getInvoiceById(id)
    .then((invoice) => event.reply(InvoiceEvent.RESULT_GET_ONE_INVOICE, {
      result: 1,
      content: {
        invoice,
      }
    }))
    .catch((err) => event.reply(InvoiceEvent.RESULT_GET_ONE_INVOICE, err));
});

// listner insert company
ipcMain.on(InvoiceEvent.INSERT_ONE_INVOICE, (event, invoice) => {
  let dateNow = new Date();
  invoiceService.createInvoice(invoice, {
    dateNow,
  })
    .then((data) => event.reply(InvoiceEvent.RESULT_INSERT_ONE_INVOICE, {
      result: 1,
    }))
    .catch((err) => event.reply(InvoiceEvent.RESULT_INSERT_ONE_INVOICE, err));;
});

// listner update company
ipcMain.on(InvoiceEvent.UPDATE_ONE_INVOICE, (event, invoice) => {
  let dateNow = new Date();
  invoiceService.updateInvoice(invoice, {
    dateNow,
  })
    .then((data) => event.reply(InvoiceEvent.RESULT_UPDATE_ONE_INVOICE, {
      result: 1,
    }))
    .catch((err) => event.reply(InvoiceEvent.RESULT_UPDATE_ONE_INVOICE, err));;
});

// listner delete company
ipcMain.on(InvoiceEvent.DELETE_ONE_INVOICE, (event, { id }) => {
  if(!id || id < 1) {
    event.reply(InvoiceEvent.RESULT_DELETE_ONE_INVOICE, {
      result: 0,
      message: 'Vui lòng chọn hóa đơn để xóa.'
    });
    return;
  }

  let dateNow = new Date();
  invoiceService.deleteInvoice(id, {
    dateNow,
  })
    .then((data) => event.reply(InvoiceEvent.RESULT_DELETE_ONE_INVOICE, {
      result: 1,
      content: {
        deleteid: id,
      }
    }))
    .catch((err) => event.reply(InvoiceEvent.RESULT_DELETE_ONE_INVOICE, err));;
});