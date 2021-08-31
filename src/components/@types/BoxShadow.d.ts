interface IBoxShadow extends IStyles {
  padding?: number;
  children?: any;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
