interface IPagination {
  totalPage: number;
  page: number;
  handleSelectNumber?: (page: number) => void;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onNext?: React.MouseEventHandler<HTMLDivElement>;
}
