import React, { FC, useState } from "react";

import { BoxShadow, Button, Input, Modal } from "../../../../components";
import "./ModalDate.scss";

export const ModalDate: FC<IModalDate> = ({
  onChoosePDF,
  onClose,
  ...props
}) => {
  const [date, setDate] = useState("");

  return (
    <Modal {...props}>
      <BoxShadow className="modal-date">
        <h3>CHỌN NGÀY LƯU</h3>
        <Input
          type="date"
          className="modal-date__input"
          marginBottom={16}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="modal-date__actions">
          <Button isBig isRed onClick={onClose}>
            Hủy
          </Button>
          <Button
            isBig
            onClick={() => {
              if (onChoosePDF) {
                return onChoosePDF(date);
              }
            }}
          >
            Chọn PDF
          </Button>
        </div>
      </BoxShadow>
    </Modal>
  );
};
