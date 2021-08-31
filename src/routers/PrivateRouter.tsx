import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { CompanyContext } from "../store/reducers";

export const PrivateRouter: React.FC<IRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  title,
}) => {
  const { state } = useContext(CompanyContext);
  const history = useHistory();

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (!state.companyData.id) {
          history.push("/login");
        }

        return (
          <Layout title={title}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
