import React from "react";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import "./ModalConfirm.scss";

export const ModalConfirm: React.FC<IModalConfirm> = ({
  message,
  isOpen,
  setOpen,
  onCancel,
  onOK,
}) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <BoxShadow className="modal-confirm">
        <p>{message}</p>
        <div className="modal-confirm__actions">
          <Button isBig isRed onClick={onCancel}>
            Hủy
          </Button>
          <Button isBig onClick={onOK}>
            Đồng ý
          </Button>
        </div>
      </BoxShadow>
    </Modal>
  );
};
