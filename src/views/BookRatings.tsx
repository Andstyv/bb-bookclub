import { RatingCard } from "../components/RatingCard";
import { useEffect } from "react";
import { useGetSession } from "../hooks/useGetSession";
import { useNavigate } from "react-router-dom";
import { useGetAllRatingsByUser } from "../hooks/useGetAllRatingsByUser";

export const BookRatings = () => {
  const { session, loadingSession } = useGetSession();

  const { userRatings, isLoading } = useGetAllRatingsByUser({ session });

  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !loadingSession) {
      navigate("/");
    }
  }, [session, loadingSession]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* <RatingCard />
      <RatingCard /> */}
      {userRatings && !isLoading && userRatings.map((book) => <RatingCard book={book} />)}
    </div>
  );
};
