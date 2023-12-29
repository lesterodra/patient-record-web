import { MONTHS, RECORD_STATUSES } from "./constants";

export const getValueDisplay = (value: any): string => value || "-";

export const getDisplayStatus = (status: string): string =>
  RECORD_STATUSES.find((recordStatus) => recordStatus.value === status)
    ?.label ?? "-";

export const convertToReadableDate = (date: string | null | Date): string => {
  const parsedDate = new Date(date ?? "");
  const month = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return date
    ? `${MONTHS[month.toString() as keyof typeof MONTHS]} ${day}, ${year}`
    : "-";
};

export const displayDateAndTime = (date: string) => {
  return date
    ? Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(date))
    : "-";
};

export const displayFullName = (
  lastName?: string | null,
  firstName?: string | null,
  middleName?: string | null
): string => `${lastName}, ${firstName} ${middleName}`;
