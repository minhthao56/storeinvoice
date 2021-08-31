const UserEvent = {
  GET_ALL_USERS: "GET_ALL_USERS",
  INSERT_ONE_USER: "INSERT_ONE_USER",
  RESULT_GET_ALL_USER: "RESULT_GET_ALL_USER",
};

const CompanyEvent = {
  GET_ALL_COMPANIES: "GET_ALL_COMPANIES",
  GET_ONE_COMPANY: "GET_ONE_COMPANY",
  INSERT_ONE_COMPANY: "INSERT_ONE_COMPANY",
  UPDATE_ONE_COMPANY: "UPDATE_ONE_COMPANY",
  DELETE_ONE_COMPANY: "DELETE_ONE_COMPANY",

  RESULT_GET_ALL_COMPANIES: "RESULT_GET_ALL_COMPANIES",
  RESULT_GET_ONE_COMPANY: "RESULT_GET_ONE_COMPANY",
  RESULT_INSERT_ONE_COMPANY: "RESULT_INSERT_ONE_COMPANY",
  RESULT_UPDATE_ONE_COMPANY: "RESULT_UPDATE_ONE_COMPANY",
  RESULT_DELETE_ONE_COMPANY: "RESULT_DELETE_ONE_COMPANY",
};

const InvoiceEvent = {
  GET_ALL_INVOICES: "GET_ALL_INVOICES",
  GET_ONE_INVOICE: "GET_ONE_INVOICE",
  INSERT_ONE_INVOICE: "INSERT_ONE_INVOICE",
  UPDATE_ONE_INVOICE: "UPDATE_ONE_INVOICE",
  DELETE_ONE_INVOICE: "DELETE_ONE_INVOICE",

  RESULT_GET_ALL_INVOICES: "RESULT_GET_ALL_INVOICES",
  RESULT_GET_ONE_INVOICE: "RESULT_GET_ONE_INVOICE",
  RESULT_INSERT_ONE_INVOICE: "RESULT_INSERT_ONE_INVOICE",
  RESULT_UPDATE_ONE_INVOICE: "RESULT_UPDATE_ONE_INVOICE",
  RESULT_DELETE_ONE_INVOICE: "RESULT_DELETE_ONE_INVOICE",
};

const ConfigEvent = {
  GET_ALL_CONFIGS: "GET_ALL_CONFIGS",
  GET_ONE_CONFIG: "GET_ONE_CONFIG",
  INSERT_ONE_CONFIG: "INSERT_ONE_CONFIG",
  UPDATE_ONE_CONFIG: "UPDATE_ONE_CONFIG",
  DELETE_ONE_CONFIG: "DELETE_ONE_CONFIG",

  RESULT_GET_ALL_CONFIGS: "RESULT_GET_ALL_CONFIGS",
  RESULT_GET_ONE_CONFIG: "RESULT_GET_ONE_CONFIG",
  RESULT_INSERT_ONE_CONFIG: "RESULT_INSERT_ONE_CONFIG",
  RESULT_UPDATE_ONE_CONFIG: "RESULT_UPDATE_ONE_CONFIG",
  RESULT_DELETE_ONE_CONFIG: "RESULT_DELETE_ONE_CONFIG",
};

const MediaEvent = {
  STORE_MEDIA: "STORE_MEDIA",

  RESULT_STORE_MEDIA: "RESULT_STORE_MEDIA",
};

const WinEvent = {
  WIN_CLOSE: "WIN_CLOSE",
  WIN_ZOOM: "WIN_ZOOM",
  WIN_MINIMIZE: "WIN_MINIMIZE",
  IS_MAXIMIZED: "IS_MAXIMIZED",
  WIN_SIZE: "WIN_SIZE",
};

const AutoUpdateEvent = {
  UPDATE_AVAILABLE: "UPDATE_AVAILABLE",
  DOWNLOAD_PROGRESS: "DOWNLOAD_PROGRESS",
  UPDATA_DOWNLOADED: "UPDATA-DOWNLOADED",
};

module.exports = {
  UserEvent,
  CompanyEvent,
  InvoiceEvent,
  ConfigEvent,
  MediaEvent,
  WinEvent,
  AutoUpdateEvent,
};
