import React, { useReducer } from "react";
import { Routers } from "./routers";
import {
  CompanyContext,
  companyReducer,
  initialCompanyState,
} from "./store/reducers";
import "./App.scss";
import { AutoUpdate } from "./containers";

export const App = () => {
  const [state, dispatch] = useReducer(companyReducer, initialCompanyState);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      <AutoUpdate />
      <Routers />
    </CompanyContext.Provider>
  );
};
