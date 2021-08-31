interface IButton extends IStyles {
  isRed?: boolean;
  isBig?: boolean;
  isWhite?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  isExtraBig?: boolean;
}
