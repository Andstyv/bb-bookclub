import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";

export const HomeView = () => {
  return (
    <>
      <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
      <LatestRatings />
    </>
  );
};
