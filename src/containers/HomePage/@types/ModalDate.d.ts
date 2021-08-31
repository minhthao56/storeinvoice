interface IModalDate extends IModal {
  onChoosePDF?: (date: any) => void;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
