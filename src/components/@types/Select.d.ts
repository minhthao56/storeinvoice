interface ISelect {
  error?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  options: Array<{ id: number; title: string }>;
  onSelect?: (item: { id: number; title: string }) => void;
  value?: IOption | number;
}
