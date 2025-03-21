import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Book, Rating, User } from "../../types/types";
import toast, { Toaster } from "react-hot-toast";
import { getRatingsByUserAndBookIdPocket } from "../../services/pocketservice";
import { usePocketBase } from "../../hooks/usePocketbase";
import { pb } from "../../utils/pocketBaseUtils";
import { useAuthStore } from "../../utils/useAuthStore";

type DataProps = {
  movie_id: number;
  rating_score: number;
};

type Props = {
  userRatingByBookId?: Rating | null;
  currentBook: Book;
  userData?: User;
  bookId?: string;
};

export const BookRatingForm = ({ bookId, currentBook, userData }: Props) => {
  const { user } = useAuthStore();
  const { register, handleSubmit } = useForm<DataProps>();
  const [userRatingScore, setUserRatingScore] = useState<string>("-");
  const { loading, data: userRatingByBookId, error } = usePocketBase(() => getRatingsByUserAndBookIdPocket(user?.id, bookId));

  async function updateBookRating(formData: FieldValues) {
    const updates = {
      rating_score: parseFloat(formData.rating_score),
    };

    await pb.collection("ratings").update(`${userRatingByBookId[0].id}`, updates);
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
      user_id: user?.id,
      user_email: user?.email,
      book_id: currentBook?.id,
      book_isbn: currentBook?.isbn,
      username: userData?.username,
      rating_score: parseFloat(formData.rating_score),
      book_title: currentBook?.title,
      author_name: currentBook?.author,
      book_description: currentBook?.description,
      book_cover_url: currentBook?.cover_img_url,
    };

    await pb.collection("ratings").create(updates);

    if (error) {
      alert(error.message);
    } else {
      toast.success("Rating registrert", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  }

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
      {userRatingByBookId && (
        <form
          className="card-body p-4 my-8 rounded-lg bg-bb_primary flex flex-col gap-4"
          onSubmit={handleSubmit(userRatingByBookId[0] ? updateBookRating : addNewBookRating)}
        >
          {userRatingByBookId[0]?.rating_score ? (
            <p className="italic text-center text-white">{`Du har allerede gitt denne ${userRatingByBookId[0]?.rating_score} poeng`}</p>
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
            {userRatingByBookId[0] ? "Endre min rating" : "Gi rating"}
          </button>
        </form>
      )}
      <Toaster />
    </>
  );
};
