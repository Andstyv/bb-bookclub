import { UserRatings } from "../hooks/useGetAllRatingsByUser";

interface Props {
  book: UserRatings;
}

export const RatingCard = ({ book }: Props) => {
  return (
    <div className="border h-40 rounded-xl">
      <div className="p-4 flex h-full gap-4">
        <div className="flex-1 bg-red-300">Img</div>
        <div className="flex-1">
          <p>{book.book_title}</p>
          <p>Av {book.author_name}</p>
        </div>
        <div className="flex-1">{book.rating_score}</div>
      </div>
    </div>
  );
};
