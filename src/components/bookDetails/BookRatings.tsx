import { useSupabase } from "../../hooks/useSupabase";
import { getBookRatingsById } from "../../services/supaservice";
import { Rating } from "../../types/types";
import { BookRatingsCard } from "./BookRatingsCard";

type Props = {
  id: string;
};

export const BookRatings = ({ id }: Props) => {
  const { data: bookRatings, loading, error } = useSupabase(() => getBookRatingsById(id));

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
