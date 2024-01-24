import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGetAvgRatingForBook } from "../hooks/useGetAvgRatingForBook";
import { useGetRatingsByUser } from "../hooks/useGetRatingByUser";
import { Session } from "@supabase/gotrue-js";
import { currentBook } from "../book/currentBook";
import { useGetUser } from "../hooks/useGetUser";

type DataProps = {
  movie_id: number;
  rating_score: number;
};

type Props = {
  session?: Session;
};

const currentBookISBN = currentBook.isbn;

export const BookDetails = ({ session }: Props) => {
  const { register, handleSubmit } = useForm<DataProps>();
  const [userRatingScore, setUserRatingScore] = useState<string>("-");
  const { avgRating } = useGetAvgRatingForBook(currentBookISBN);
  const { userRating, isLoading } = useGetRatingsByUser({ session, currentBookISBN });
  const { userData } = useGetUser({ session });

  async function addNewBookRating(formData: FieldValues) {
    const updates = {
      user_id: session?.user.id,
      book_isbn: currentBook.isbn,
      username: userData?.username,
      rating_score: parseFloat(formData.rating_score),
      book_id: currentBook.id,
      book_title: currentBook.title,
      author_name: currentBook.author,
      book_description: currentBook.description,
      book_cover_url: currentBook.cover_img_url,
    };

    const { error } = await supabase.from("ratings").insert(updates);

    if (error) {
      console.log(updates);
      alert(error.message);
    } else {
      alert("Added your rating!");
    }
  }

  async function updateBookRating(formData: FieldValues) {
    const updates = {
      rating_score: parseFloat(formData.rating_score),
    };
    const { error } = await supabase.from("ratings").update(updates).eq("user_id", session?.user.id);

    if (error) {
      console.log(updates);
      alert(error.message);
    } else {
      alert("Updated your rating!");
    }
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col text-white gap-6 mt-12">
        <div className={`bg-cover bg-no-repeat rounded-2xl h-96 w-full bg-[url(${currentBook.cover_img_url})]`}></div>
        <div className="flex">
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl">{currentBook.title}</h2>
            <p className="text-[#9797b0]">{currentBook.author}</p>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-12 bg-slate-500 flex justify-center items-center rounded-full text-xl">{avgRating || "-"}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">Description</h3>
          <p className="text-[#9797b0]">{currentBook.description}</p>
        </div>
        {!isLoading && session && (
          <form
            className="card-body p-4 my-8 border rounded-lg bg-slate-200 flex flex-col gap-4"
            onSubmit={handleSubmit(userRating ? updateBookRating : addNewBookRating)}
          >
            {userRating?.rating_score ? (
              <p className="italic text-center text-black">{`Du har allerede gitt denne ${userRating?.rating_score} poeng`}</p>
            ) : (
              ""
            )}
            <div className="self-center min-w-[50px] text-center bg-slate-600 p-1 rounded-lg">{userRatingScore}</div>
            <input
              type="range"
              min={0}
              max={10}
              defaultValue={5}
              className="range"
              step={0.5}
              {...register("rating_score")}
              onChange={(e) => setUserRatingScore(e.target.value)}
            />
            <button className="bg-red-600 mt-auto p-4 rounded-lg">{userRating ? "Endre min rating" : "Gi rating"}</button>
          </form>
        )}
      </div>
    </>
  );
};
