import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useGetAvgRatingForBook } from "../hooks/useGetAvgRatingForBook";
import { Session } from "@supabase/gotrue-js";
import { useGetUser } from "../hooks/useGetUser";
import { useParams } from "react-router-dom";
import { books } from "../books/books";
import { Book } from "../types/types";
import { useGetRatingByUserAndBookId } from "../hooks/useGetRatingsByUserAndBookId";
import toast, { Toaster } from "react-hot-toast";

type DataProps = {
  movie_id: number;
  rating_score: number;
};

type Props = {
  session?: Session;
};

export const DetailedBookView = ({ session }: Props) => {
  const { register, handleSubmit } = useForm<DataProps>();
  const [userRatingScore, setUserRatingScore] = useState<string>("-");
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

  async function addNewBookRating(formData: FieldValues) {
    const updates = {
      user_id: session?.user.id,
      book_id: currentBook?.id,
      book_isbn: currentBook?.isbn,
      username: userData?.username,
      rating_score: parseFloat(formData.rating_score),
      book_title: currentBook?.title,
      author_name: currentBook?.author,
      book_description: currentBook?.description,
      book_cover_url: currentBook?.cover_img_url,
    };

    const { error } = await supabase.from("ratings").insert(updates);

    if (error) {
      alert(error.message);
    } else {
      toast.success("Rating registrert", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  }

  async function updateBookRating(formData: FieldValues) {
    const updates = {
      rating_score: parseFloat(formData.rating_score),
    };
    const { error } = await supabase.from("ratings").update(updates).eq("user_id", session?.user.id).eq("book_id", currentBook?.id);

    if (error) {
      alert(error.message);
    } else {
      toast.success("Oppdaterte rating", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  }

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
              <span className="w-12 h-12 bg-slate-500 flex justify-center items-center rounded-full text-xl">{avgRatingByBookId || "-"}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl">Description</h3>
            <p className="text-[#9797b0]">{currentBook.description}</p>
          </div>
          {!isLoading && session && (
            <form
              className="card-body p-4 my-8 rounded-lg bg-slate-400 flex flex-col gap-4"
              onSubmit={handleSubmit(userRatingByBookId ? updateBookRating : addNewBookRating)}
            >
              {userRatingByBookId?.rating_score ? (
                <p className="italic text-center text-black">{`Du har allerede gitt denne ${userRatingByBookId?.rating_score} poeng`}</p>
              ) : (
                ""
              )}
              <div className="self-center min-w-[50px] text-center bg-slate-500 p-1 rounded-lg">{userRatingScore}</div>
              <input
                type="range"
                min={0}
                max={10}
                defaultValue={5}
                className="range"
                step={1}
                {...register("rating_score")}
                onChange={(e) => setUserRatingScore(e.target.value)}
              />
              <button className="bg-[#EB2516] mt-auto hover:bg-[#eb2416dc] p-4 rounded-lg">
                {userRatingByBookId ? "Endre min rating" : "Gi rating"}
              </button>
            </form>
          )}
        </div>
      )}
      <Toaster />
    </>
  );
};
