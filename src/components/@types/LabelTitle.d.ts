interface ILabelTitle extends IStyles {
  title?: string;
  hasBottomLine?: boolean;
  hasBtnAdd?: boolean;
  handleBtnAdd?: React.MouseEventHandler<HTMLButtonElement>;
  secondContent?: JSX.Element;
}
