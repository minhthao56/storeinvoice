interface IModal {
  isOpen?: boolean | string;
  setOpen?: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
}
