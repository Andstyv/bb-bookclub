import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Book, Rating, User } from "../../types/types";
import { supabase } from "../../supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Session } from "@supabase/supabase-js";

type DataProps = {
  movie_id: number;
  rating_score: number;
};

type Props = {
  userRatingByBookId?: Rating | null;
  session: Session;
  currentBook: Book;
  userData?: User;
};

export const BookRatingForm = ({ userRatingByBookId, session, currentBook, userData }: Props) => {
  const { register, handleSubmit } = useForm<DataProps>();
  const [userRatingScore, setUserRatingScore] = useState<string>("-");

  async function updateBookRating(formData: FieldValues) {
    const updates = {
      rating_score: parseFloat(formData.rating_score),
    };
    const { error } = await supabase.from("ratings").update(updates).eq("user_id", session?.user.id).eq("book_id", currentBook?.id);

    if (error) {
      toast.error(error.message, {
        duration: 3000,
        position: "bottom-center",
      });
    } else {
      toast.success("Oppdaterte rating", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  }

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

  return (
    <>
      <form
        className="card-body p-4 my-8 rounded-lg bg-bb_primary flex flex-col gap-4"
        onSubmit={handleSubmit(userRatingByBookId ? updateBookRating : addNewBookRating)}
      >
        {userRatingByBookId?.rating_score ? (
          <p className="italic text-center text-white">{`Du har allerede gitt denne ${userRatingByBookId?.rating_score} poeng`}</p>
        ) : (
          ""
        )}
        <div className="self-center min-w-[50px] text-center bg-bb_bg p-1 rounded-lg">{userRatingScore}</div>
        <input
          type="range"
          min={0}
          max={10}
          defaultValue={5}
          className="range cursor-pointer"
          step={1}
          {...register("rating_score")}
          onChange={(e) => setUserRatingScore(e.target.value)}
        />
        <button className="bg-bb_secondary mt-auto hover:brightness-110 p-4 rounded-lg">
          {userRatingByBookId ? "Endre min rating" : "Gi rating"}
        </button>
      </form>
      <Toaster />
    </>
  );
};
