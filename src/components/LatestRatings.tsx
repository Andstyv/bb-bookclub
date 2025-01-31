import { AuthRecord } from "pocketbase";
import { Rating } from "../types/types";
import { LatestRatingsCard } from "./LatestRatingsCard";

type Props = {
  ratings: Rating[];
  session: AuthRecord;
};

export const LatestRatings = ({ ratings, session }: Props) => {
  const allRatings = ratings || [];

  if (session) {
    return (
      <div className="w-full max-w-xs mt-6 text-white mb-12">
        <h3 className="text-xl font-semibold">Nyeste ratings:</h3>
        <div className="flex flex-col gap-4 mt-4">
          {allRatings.length ? allRatings.slice(0, 5).map((rating) => <LatestRatingsCard rating={rating} key={rating.id} />) : <div>No ratings</div>}
        </div>
      </div>
    );
  }
};
