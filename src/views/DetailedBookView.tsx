import { useEffect, useState } from "react";
import { useGetAvgRatingForBook } from "../hooks/useGetAvgRatingForBook";
import { Session } from "@supabase/gotrue-js";
import { useParams } from "react-router-dom";
import { books } from "../books/books";
import { Book } from "../types/types";
import { useGetRatingByUserAndBookId } from "../hooks/useGetRatingsByUserAndBookId";
import { BookRatingForm } from "../components/bookDetails/BookRatingForm";
import { useGetUser } from "../hooks/useGetUser";
import { BookRatings } from "../components/bookDetails/BookRatings";

type Props = {
  session?: Session;
};

export const DetailedBookView = ({ session }: Props) => {
  const { userData } = useGetUser({ session });
  const { id } = useParams();
  const { avgRatingByBookId } = useGetAvgRatingForBook(id);
  const { userRatingByBookId, isLoading } = useGetRatingByUserAndBookId({ session, id });
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

  return (
    <>
      {currentBook && (
        <div className="flex w-full max-w-2xl flex-col text-white gap-6 mt-12 mb-16">
          <div>
            <img src={currentBook.cover_img_url} className="rounded-xl h-96 w-full object-cover object-top" />
          </div>
          <div className="flex">
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl">{currentBook.title}</h2>
              <p className="text-[#9797b0]">{currentBook.author}</p>
            </div>
            <div className="flex items-center">
              <span className="w-12 h-12 bg-bb_btn flex justify-center items-center rounded-full text-xl font-semibold">
                {avgRatingByBookId || "-"}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl">Description</h3>
            <p className="text-[#9797b0]">{currentBook.description}</p>
          </div>
          {!isLoading && session && (
            <BookRatingForm userData={userData} currentBook={currentBook} session={session} userRatingByBookId={userRatingByBookId} />
          )}
          {id && <BookRatings id={id} />}
        </div>
      )}
    </>
  );
};
