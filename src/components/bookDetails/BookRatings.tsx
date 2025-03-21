import { useEffect, useState } from "react";
import { Rating } from "../../types/types";
import { BookRatingsCard } from "./BookRatingsCard";
import { getBookRatingsByIdPocket } from "../../services/pocketservice";

type Props = {
  id: string;
};

export const BookRatings = ({ id }: Props) => {
  const [bookRatings, setBookRatings] = useState<Rating[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      const { data, error } = await getBookRatingsByIdPocket(id);
      setBookRatings(data);
      setError(error);
      setLoading(false);
    };

    fetchRatings();
  }, [id]);

  if (error) {
    return (
      <>
        <div>An error occured</div>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <>
      <h2 className="font-semibold text-xl">Ratings for bok</h2>
      {!loading && bookRatings?.length ? (
        bookRatings.map((rating: Rating) => <BookRatingsCard key={rating.id} rating={rating} />)
      ) : (
        <span className="italic">Ingen ratings gitt enda</span>
      )}
    </>
  );
};
