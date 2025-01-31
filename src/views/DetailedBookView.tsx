import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { books } from "../books/books";
import { Book } from "../types/types";
import { BookRatings } from "../components/bookDetails/BookRatings";
import { getAvgRatingForBookByIdPocket } from "../services/pocketservice";
import { AuthRecord } from "pocketbase";
import { usePocketBase } from "../hooks/usePocketbase";
import { BookRatingForm } from "../components/bookDetails/BookRatingForm";

type Props = {
  session?: AuthRecord;
};

export const DetailedBookView = ({ session }: Props) => {
  const { id } = useParams();
  const { loading, data, error } = usePocketBase(() => getAvgRatingForBookByIdPocket(id));
  const [currentBook, setCurrentBook] = useState<Book>();

  useEffect(() => {
    const getBookById = (id: string) => {
      const convertedId = parseFloat(id);
      const filteredBook = books.find((book) => book.id === convertedId);
      setCurrentBook(filteredBook);
    };
    if (id) {
      getBookById(id);
    }
  }, [id]);

  if (error) {
    return (
      <>
        <div>An error occured</div>
        <div>{error.message}</div>
      </>
    );
  }
  if (loading)
    return (
      <>
        <h1>Loading</h1>
      </>
    );

  return (
    <>
      {currentBook && (
        <div className="flex w-full max-w-2xl flex-col text-white gap-6 mt-12 mb-16">
          <div>
            <img src={currentBook.cover_img_url} className="rounded-xl h-96 w-full object-cover object-center" />
          </div>
          <div className="flex">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl">{currentBook.title}</h2>
              <p className="text-[#9797b0]">{currentBook.author}</p>
            </div>
            <div className="flex items-center">
              <span className="w-12 h-12 bg-bb_btn flex justify-center items-center rounded-full text-xl font-semibold">{data > 0 ? data : "-"}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl">Description</h3>
            <p className="text-[#9797b0]">{currentBook.description}</p>
          </div>
          {!loading && session && <BookRatingForm bookId={id} currentBook={currentBook} session={session} />}
          {id && <BookRatings id={id} />}
        </div>
      )}
    </>
  );
};
