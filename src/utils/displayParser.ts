import { MONTHS } from "./constants";

export const getValueDisplay = (value: any): string => value || "-";

export const convertToReadableDate = (date: string | null): string => {
  const parsedDate = new Date(date ?? "");
  const month = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return date
    ? `${MONTHS[month.toString() as keyof typeof MONTHS]} ${day}, ${year}`
    : "-";
};
