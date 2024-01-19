import { RatingCard } from "../components/RatingCard";

export const BookRatings = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <RatingCard />
      <RatingCard />
    </div>
  );
};
