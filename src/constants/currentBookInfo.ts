import { formatDaysBetweenTwoDates } from "../utils/formats";

export const currentBookId = "1";
export const currentBookEndDate = new Date(2024, 2, 16);
export const daysLeft = formatDaysBetweenTwoDates(new Date(), currentBookEndDate);
