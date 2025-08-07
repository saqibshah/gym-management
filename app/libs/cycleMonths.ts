import { differenceInMonths } from "date-fns";

export function cycleMonths(joinedAt: Date) {
  const joined = new Date(joinedAt);
  const today = new Date();

  const fullMonths = differenceInMonths(today, joined);
  const spanMonths = fullMonths + 1;

  return { spanMonths, joined };
}
