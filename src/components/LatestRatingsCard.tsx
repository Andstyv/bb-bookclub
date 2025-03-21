import { Rating } from "../types/types";

interface Props {
  rating: Rating;
}

export const LatestRatingsCard = ({ rating }: Props) => {
  if (rating.expand)
    return (
      <div className="bg-bb_primary rounded-lg p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-md max-w-52">{rating.book_title}</p>
            <p className="mt-2 text-slate-200 text-sm">{rating.author_name}</p>
          </div>
          <div>
            <p className="font-bold w-10 h-10 flex items-center justify-center p-2 rounded-full bg-bb_secondary">{rating.rating_score}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <p className="text-xs italic">{rating.expand.user_id.name != "" ? rating.expand.user_id.name : "Ukjent"}</p>
        </div>
      </div>
    );
};
