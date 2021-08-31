import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BoxShadow, Button } from "../../components";
import "./TypeInvoicePage.scss";

export const TypeInvoicePage = () => {
  const history = useHistory();
  const { state } = useLocation<IParamsFilterTypeInvoice>();

  return (
    <div className="type-invoice">
      <BoxShadow className="type-invoice__container">
        <h3>CHỌN LOẠI HOÁ ĐƠN</h3>
        <div className="type-invoice__actions">
          <Button
            isExtraBig
            isRed
            onClick={() =>
              history.push({
                pathname: "/",
                state: { ...state, typeinvoice: 20 },
              })
            }
          >
            Hóa đơn mua vào
          </Button>
          <Button
            isExtraBig
            onClick={() =>
              history.push({
                pathname: "/",
                state: { ...state, typeinvoice: 10 },
              })
            }
          >
            Hóa đơn bán ra
          </Button>
        </div>
      </BoxShadow>
    </div>
  );
};
