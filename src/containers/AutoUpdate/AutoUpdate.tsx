import React, { useEffect, useState } from "react";
import { BoxShadow, Button, Modal } from "../../components";
import { AutoUpdateEvent } from "../../constants/event";
import "./AutoUpdate.scss";

export const AutoUpdate = () => {
  const [type, setType] = useState("");

  const handleUpdateAvailable = () => {
    setType("available");
  };

  useEffect(() => {
    apiElectron.on(AutoUpdateEvent.UPDATE_AVAILABLE, handleUpdateAvailable);
    return () => {
      apiElectron.removeListener(
        AutoUpdateEvent.UPDATE_AVAILABLE,
        handleUpdateAvailable
      );
    };
  }, []);

  return (
    <Modal isOpen={type}>
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
