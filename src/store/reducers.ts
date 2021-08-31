import { createContext } from "react";
import { Action, ActionKind } from "./actions";

type CompanyState = {
  companyData: IResCompany;
};

export const initialCompanyState: CompanyState = {
  companyData: {
    address: "",
    createdate: 0,
    district: "",
    email: "",
    fax: "",
    id: 0,
    name: "",
    phone: "",
    province: "",
    status: 10,
    taxcode: "",
    updatedate: 0,
  },
};

export const CompanyContext = createContext<{
  state: CompanyState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialCompanyState,
  dispatch: () => undefined,
});

export function companyReducer(
  state: CompanyState,
  action: Action
): CompanyState {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.SAVE_DATA_COMPANY:
      return {
        ...state,
        companyData: payload,
      };
    case ActionKind.DELETE_DATA_COMPANY:
      return {
        ...state,
        companyData: initialCompanyState.companyData,
      };
      return state;
  }
}
