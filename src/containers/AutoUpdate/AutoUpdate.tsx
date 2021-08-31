import React from "react";
import { BoxShadow, Button, Modal } from "../../components";
import "./AutoUpdate.scss";

export const AutoUpdate = () => {
  return (
    <Modal isOpen>
      <BoxShadow className="auto-update">
        <p>Bạn có bản cập nhập phần mềm mới. Bạn có muốn cập nhật không?</p>
        <div className="auto-update__actions">
          <Button isBig isRed>
            Hủy
          </Button>
          <Button isBig>Cập nhật</Button>
        </div>
      </BoxShadow>
    </Modal>
  );
};
