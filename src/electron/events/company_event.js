const { CompanyEvent } = require("../../constants/event");
const { companyService } = require("../database/index");

const { ipcMain } = require("electron");

// listener get companies
ipcMain.on(CompanyEvent.GET_ALL_COMPANIES, (event, filter) => {
  companyService.getCompanies(filter)
    .then((companies) => {
      event.reply(CompanyEvent.RESULT_GET_ALL_COMPANIES, {
        result: 1,
        content: {
          companies,
        }
      });
    })
    .catch((err) => event.reply(CompanyEvent.RESULT_GET_ALL_COMPANIES, err));
});

// listener get one company
ipcMain.on(CompanyEvent.GET_ONE_COMPANY, (event, filter) => {
  companyService.getCompanyById(filter)
    .then((company) => {
      event.reply(CompanyEvent.RESULT_GET_ONE_COMPANY, {
        result: 1,
        content: {
          company,
        }
      });
    })
    .catch((err) => event.reply(CompanyEvent.RESULT_GET_ONE_COMPANY, err));
});

// listner insert company
ipcMain.on(CompanyEvent.INSERT_ONE_COMPANY, (event, company) => {
  if(!company || !company.name || !company.taxcode) {
    event.reply(CompanyEvent.RESULT_INSERT_ONE_COMPANY, {
      result: 0,
      message: 'Vui lòng điền đầu đủ thông tin.'
    });
    return;
  }

  let dateNow = new Date();
  companyService.createCompany(company, {
    dateNow,
  })
    .then((data) => event.reply(CompanyEvent.RESULT_INSERT_ONE_COMPANY, data))
    .catch((err) => event.reply(CompanyEvent.RESULT_INSERT_ONE_COMPANY, err));;
});

// listner update company
ipcMain.on(CompanyEvent.UPDATE_ONE_COMPANY, (event, company) => {
  if(!company || !company.name || !company.taxcode) {
    event.reply(CompanyEvent.RESULT_UPDATE_ONE_COMPANY, {
      result: 0,
      message: 'Vui lòng điền đầu đủ thông tin.'
    });
    return;
  }

  let dateNow = new Date();
  companyService.updateCompany(company, {
    dateNow,
  })
    .then((data) => event.reply(CompanyEvent.RESULT_UPDATE_ONE_COMPANY, data))
    .catch((err) => event.reply(CompanyEvent.RESULT_UPDATE_ONE_COMPANY, err));;
});

// listner delete company
ipcMain.on(CompanyEvent.DELETE_ONE_COMPANY, (event, { id, taxcode }) => {
  if((!id || id < 1) && !taxcode) {
    event.reply(CompanyEvent.RESULT_DELETE_ONE_COMPANY, {
      result: 0,
      message: 'Vui lòng chọn công ty để xóa.'
    });
    return;
  }

  let dateNow = new Date();
  companyService.deleteCompany(id, {
    taxcode,
    dateNow,
  })
    .then((data) => event.reply(CompanyEvent.RESULT_DELETE_ONE_COMPANY, {
      result: 1,
    }))
    .catch((err) => event.reply(CompanyEvent.RESULT_DELETE_ONE_COMPANY, err));;
});