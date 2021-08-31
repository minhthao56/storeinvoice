import React, { FC } from "react";
import { Modal, InvoicePreview } from "../../../../components";
import "./ModalPreviewInvoice.scss";

interface IModalPreviewInvoice extends IModal {
  link?: string;
}

export const ModalPreviewInvoice: FC<IModalPreviewInvoice> = ({
  link,
  ...props
}) => {
  return (
    <Modal {...props} className="modal-preview-invoice">
      <InvoicePreview link={link} />
    </Modal>
  );
};
