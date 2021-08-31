export enum ActionKind {
  SAVE_DATA_COMPANY = "SAVE_DATA_COMPANY",
  DELETE_DATA_COMPANY = "DELETE_DATA_COMPANY",
}

export type Action = {
  type: ActionKind;
  payload: IResCompany;
};

export const doSaveCompanyData = (data: IResCompany): Action => {
  return {
    type: ActionKind.SAVE_DATA_COMPANY,
    payload: data,
  };
};
