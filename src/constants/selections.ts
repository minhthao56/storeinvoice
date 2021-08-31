export const optionTypeInvoid = [
  {
    id: 10,
    title: "Hóa đơn bán ra",
  },
  {
    id: 20,
    title: "Hóa đơn mua vào",
  },
];

export const optionTypeStore = [
  {
    id: 1,
    title: "Theo Tháng",
  },
  {
    id: 2,
    title: "Theo Quý",
  },
];

export const optionGroupMonth = [
  {
    id: 10,
    title: "Quý 1",
  },
  {
    id: 20,
    title: "Quý 2",
  },
  {
    id: 30,
    title: "Quý 3",
  },
  {
    id: 40,
    title: "Quý 4",
  },
];

export const optionYears = [
  { id: 0, title: `Tất cả` },
  ...Array.from(Array(50).keys()).map((item, i) => {
    return {
      id: 2000 + i,
      title: `${2000 + i}`,
    };
  }),
];

export const optionMonths = [
  {
    id: 1,
    title: "Tháng 1",
  },
  {
    id: 2,
    title: "Tháng 2",
  },
  {
    id: 3,
    title: "Tháng 3",
  },
  {
    id: 4,
    title: "Tháng 4",
  },
  {
    id: 5,
    title: "Tháng 5",
  },
  {
    id: 6,
    title: "Tháng 6",
  },
  {
    id: 7,
    title: "Tháng 7",
  },
  {
    id: 8,
    title: "Tháng 8",
  },
  {
    id: 9,
    title: "Tháng 9",
  },
  {
    id: 10,
    title: "Tháng 10",
  },
  {
    id: 11,
    title: "Tháng 11",
  },
  {
    id: 12,
    title: "Tháng 12",
  },
];
