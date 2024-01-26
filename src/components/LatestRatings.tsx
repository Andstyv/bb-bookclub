import { useGetAllRatings } from "../hooks/useGetAllRatings";
import { LatestRatingsCard } from "./LatestRatingsCard";

export const LatestRatings = () => {
  const { ratings, isLoading } = useGetAllRatings();

  return (
    <div className="w-full max-w-xs mt-6 text-white mb-12">
      <h3 className="text-xl font-semibold">Nyeste ratings:</h3>
      {ratings && !isLoading && (
        <div className="flex flex-col gap-4 mt-4">
          {ratings.map((rating) => (
            <LatestRatingsCard rating={rating} key={rating.id} />
          ))}
        </div>
      )}
    </div>
  );
};
