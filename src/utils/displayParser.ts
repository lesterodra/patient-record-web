import { Prisma } from "@prisma/client";
import {
  MEDICAL_HISTORY_OBJECT,
  MONTHS,
  PREVIOUS_SURGERIES_OBJECT,
  RECORD_STATUSES,
} from "./constants";
import { UserType } from "@/redux/features/user-slice";

export const getValueDisplay = (value: any): string => value || "-";

export const getDisplayStatus = (status: string): string =>
  RECORD_STATUSES.find((recordStatus) => recordStatus.value === status)
    ?.label ?? "-";

export const getUserFullName = (
  user: {
    firstName: string | null;
    lastName: string | null;
    middleName: String | null;
  } | null
): string =>
  user ? `${user.lastName}, ${user.firstName} ${user.middleName}` : "-";

export const convertToDateString = (dateObject: Date): string =>
  `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;

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

export const getPersonalMedicalHistoryData = (input: any) => {
  const data = MEDICAL_HISTORY_OBJECT.map((medicalHistory) =>
    input[`${medicalHistory.code}Checkbox`]
      ? { id: medicalHistory.id, notes: input[`${medicalHistory.code}Input`] }
      : null
  ).filter((data) => data);

  return data;
};

export const getPreviousSurgeriesData = (input: any) => {
  const data = PREVIOUS_SURGERIES_OBJECT.map((previousSurgery) =>
    input[`${previousSurgery.code}Checkbox`]
      ? { id: previousSurgery.id, notes: input[`${previousSurgery.code}Input`] }
      : null
  ).filter((data) => data);

  return data;
};

export const isAdminUser = (session: { user: UserType }): boolean =>
  session?.user?.department?.name === "Admin";
