import { useGetBookRatingsById } from "../../hooks/useGetBookRatingsById";
import { BookRatingsCard } from "./BookRatingsCard";

type Props = {
  id: string;
};

export const BookRatings = ({ id }: Props) => {
  const { bookRatings } = useGetBookRatingsById(id);
  return (
    <>
      <h2 className="font-semibold text-xl">Ratings for bok</h2>
      {bookRatings?.length ? (
        bookRatings.map((rating) => <BookRatingsCard key={rating.id} rating={rating} />)
      ) : (
        <span className="italic">Ingen ratings gitt enda</span>
      )}
    </>
  );
};
