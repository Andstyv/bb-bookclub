import { intervalToDuration } from "date-fns";

export const formatDaysBetweenTwoDates = (startDate: Date, endDate: Date) => {
  const formattedDays = intervalToDuration({
    start: startDate,
    end: endDate,
  });

  return formattedDays;
};
