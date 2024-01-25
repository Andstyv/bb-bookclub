import { Link } from "react-router-dom";
import { Rating } from "../types/types";

interface Props {
  book: Rating;
}

export const RatingCard = ({ book }: Props) => {
  return (
    <Link to={`/detaljer/${book.book_id}`} className="shadow-lg h-40 rounded-xl bg-[#393848] text-white">
      <div className="p-4 flex h-full gap-4">
        <div className="bg-red-300 w-24 h-full">
          <img src={book.book_cover_url} className="object-cover object-top w-full h-full" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex-1">
            <p className="font-semibold">{book.book_title}</p>
            <p className="italic text-sm mt-2">Av {book.author_name}</p>
          </div>
          <div className="flex justify-center">
            <span className="p-2 w-16 flex justify-center bg-white rounded-full text-black font-bold">{book.rating_score}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
