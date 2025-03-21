import { RatingCard } from "../components/RatingCard";
import { Rating } from "../types/types";
import { getAllRatingsByUserIdPocket } from "../services/pocketservice";
import { usePocketBase } from "../hooks/usePocketbase";
import { useAuthStore } from "../utils/useAuthStore";

export const MyBookRatingsView = () => {
  const { user } = useAuthStore();
  const { loading, data: allRatingsByUser, error } = usePocketBase(() => getAllRatingsByUserIdPocket(user?.id));

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const ratings = allRatingsByUser || [];

  return (
    <div className="w-full flex flex-col gap-4 mt-20">
      <h1 className="font-bold text-2xl text-white">Mine ratinger:</h1>
      {ratings.length > 0 ? ratings.map((book: Rating) => <RatingCard key={book.id} book={book} />) : <div>No ratings found</div>}
    </div>
  );
};
