import { Rating } from "../../types/types";

type Props = {
  rating: Rating;
};

export const BookRatingsCard = ({ rating }: Props) => {
  console.log(rating);
  return (
    <div className="bg-bb_primary rounded-lg p-4 flex flex-col gap-4 m-auto w-full">
      <div className="flex justify-between items-center">
        <p>{rating.expand.user_id.name != "" ? rating.expand.user_id.name : "Ukjent"}</p>
        <p className="font-bold w-10 h-10 flex items-center justify-center p-2 rounded-full bg-bb_secondary">{rating.rating_score}</p>
      </div>
    </div>
  );
};
