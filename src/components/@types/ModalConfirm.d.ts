interface IModalConfirm extends IModal {
  message?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onOK?: React.MouseEventHandler<HTMLButtonElement>;
}
