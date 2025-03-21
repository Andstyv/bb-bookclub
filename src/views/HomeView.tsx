import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";
import { getAllRatingsPocket } from "../services/pocketservice";
import { usePocketBase } from "../hooks/usePocketbase";
import { useAuthStore } from "../utils/useAuthStore";

export const HomeView = () => {
  const { user } = useAuthStore();
  const { loading, data: allRatings, error } = usePocketBase(() => getAllRatingsPocket());

  if (error) {
    return (
      <>
        <div>An error occured</div>
        <div>{error.message}</div>
      </>
    );
  }

  if (!loading && !error)
    return (
      <>
        <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
        {allRatings && !loading && user && <LatestRatings ratings={allRatings} />}
      </>
    );
};
