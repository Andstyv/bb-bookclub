import { UserRatings } from "../hooks/useGetAllRatings";

interface Props {
  rating: UserRatings;
}

export const LatestRatingsCard = ({ rating }: Props) => {
  return (
    <div className="bg-slate-400 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{rating.book_title}</p>
          <p>{rating.author_name}</p>
        </div>
        <div>
          <p className="font-bold w-10 h-10 flex items-center justify-center p-2 rounded-full bg-red-300">{rating.rating_score}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="italic">{rating.username}</p>
      </div>
    </div>
  );
};
