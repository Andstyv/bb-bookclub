import { Rating } from "../types/types";

interface Props {
  rating: Rating;
}

export const LatestRatingsCard = ({ rating }: Props) => {
  return (
    <div className="bg-[#393848] rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{rating.book_title}</p>
          <p className="mt-2 text-slate-200">{rating.author_name}</p>
        </div>
        <div>
          <p className="font-bold w-10 h-10 flex items-center justify-center p-2 rounded-full bg-slate-500">{rating.rating_score}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="italic">{rating.username}</p>
      </div>
    </div>
  );
};
