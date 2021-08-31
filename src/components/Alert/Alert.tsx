import React from "react";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import "./Alert.scss";

export const Alert: React.FC<IAlert> = ({ isOpen, setOpen, messages }) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <BoxShadow className="alert">
        <p>{messages}</p>
        <Button
          isBig
          onClick={() => {
            if (setOpen) {
              setOpen(false);
            }
          }}
        >
          Đồng ý
        </Button>
      </BoxShadow>
    </Modal>
  );
};
