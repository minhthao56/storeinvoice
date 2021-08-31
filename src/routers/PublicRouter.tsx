import React from "react";
import { Route } from "react-router-dom";

export const PublicRouter: React.FC<IRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  title,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <Layout title={title}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
