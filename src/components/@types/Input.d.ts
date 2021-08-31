interface IInput extends IStyles {
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
  name?: string;
  placeholder?: string;
  error?: any;
  label?: string;
  hasIconSearch?: boolean;
  className?: string;
  type?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  lang?: string;
}
