interface IAlert {
  isOpen?: boolean | string;
  setOpen?: React.Dispatch<React.SetStateAction<any>>;
  messages?: string;
}
