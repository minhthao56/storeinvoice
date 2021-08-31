import React from "react";
import { Switch } from "react-router-dom";

import {
  ChooseTypeStorePage,
  HomePage,
  LoginPage,
  RegisterPage,
  InvoiceDetailPage,
  SettingPage,
  TypeInvoicePage,
  TestPage,
  CompanyProfilePage,
} from "../containers";
import { BlankLayout } from "../layouts";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const Routers = () => {
  return (
    <Switch>
      <PrivateRouter
        exact
        path="/"
        component={HomePage}
        layout={BlankLayout}
        title={"HOÁ ĐƠN"}
      />
      <PublicRouter
        exact
        path="/login"
        component={LoginPage}
        layout={BlankLayout}
        title="ĐĂNG NHẬP"
      />
      <PublicRouter
        exact
        path="/register"
        component={RegisterPage}
        layout={BlankLayout}
        title="ĐĂNG KÝ THÔNG TIN DOANH NGHIỆP"
      />
      <PrivateRouter
        exact
        path="/choose-type-store"
        component={ChooseTypeStorePage}
        layout={BlankLayout}
        title="CHỌN KỲ LƯU TRỮ"
      />
      <PrivateRouter
        exact
        path="/invoice-detail/:id"
        component={InvoiceDetailPage}
        layout={BlankLayout}
        title="CHI TIẾT HÓA ĐƠN"
      />
      <PrivateRouter
        exact
        path="/setting"
        component={SettingPage}
        layout={BlankLayout}
        title="CÀI ĐẶT"
      />

      <PrivateRouter
        exact
        path="/invoice-type"
        component={TypeInvoicePage}
        layout={BlankLayout}
        title="CHỌN LOẠI HOÁ ĐƠN"
      />

      <PrivateRouter
        exact
        path="/company-profile"
        component={CompanyProfilePage}
        layout={BlankLayout}
        title="THÔNG TIN CÔNG TY"
      />
      <PublicRouter
        exact
        path="/test-api"
        component={TestPage}
        layout={BlankLayout}
        title="TEST API"
      />
    </Switch>
  );
};
