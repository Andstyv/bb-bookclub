import { Link } from "react-router-dom";
import { books } from "../books/books";

export const BooksView = () => {
  const allBooks = books;

  return (
    <div className="flex flex-row gap-4 mt-20 flex-wrap  w-full">
      {allBooks &&
        allBooks.map((book) => (
          <Link to={`/detaljer/${book.id}`} className="cursor-pointer hover:brightness-110 transition-all flex flex-row items-center gap-8">
            <img src={book.cover_img_url} alt={book.title} className="filter object-fit h-36 w-28" />
          </Link>
        ))}
    </div>
  );
};
