import dayjs from "dayjs";

/**
 * Formats a date into a specified string format.
 * @param date The date to format (string, Date object, or timestamp).
 * @param format The desired output format (e.g., "DD/MM/YYYY"). Defaults to "DD/MM/YYYY".
 * @returns The formatted date as a string.
 */
export const dateFormatter = (
  date: string | Date | number,
  format: string = "DD/MM/YYYY"
): string => {
  return dayjs(date).format(format);
};
