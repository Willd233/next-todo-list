import dayjs from "dayjs";

export const dateFormatter = (
  date: string | Date | number,
  format: string = "DD/MM/YYYY"
): string => {
  return dayjs(date).format(format);
};
