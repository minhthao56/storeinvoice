type TypeReadMore = {
  string: string;
  maxLength: number;
};
export const readMore = (props: TypeReadMore): string => {
  const { maxLength, string } = props;

  if (maxLength < string.length) {
    return string.slice(0, maxLength) + "...";
  }
  return string;
};
