import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useGetAvgRatingForBook } from "../hooks/useGetAvgRatingForBook";
import { useGetRatingsByUser } from "../hooks/useGetRatingByUser";
import { Session } from "@supabase/gotrue-js";

type DataProps = {
  movie_id: number;
  rating_score: number;
};

type Props = {
  session?: Session;
};

const currentBookISBN = "12345";

export const BookDetails = ({ session }: Props) => {
  const { register, handleSubmit } = useForm<DataProps>();
  const [userRatingScore, setUserRatingScore] = useState<string>("0");
  const { avgRating } = useGetAvgRatingForBook(currentBookISBN);
  const { userRating, isLoading } = useGetRatingsByUser({ session, currentBookISBN });

  async function updateRating(formData: FieldValues) {
    const updates = {
      user_id: session?.user.id,
      username: "Rønna Test",
      book_isbn: "12345",
      rating_score: parseFloat(formData.rating_score),
      book_title: "Lord of the Rings",
      author_name: "J.R.R. Tolkien",
    };

    const { error } = await supabase.from("ratings").insert(updates);

    if (error) {
      console.log(updates);
      alert(error.message);
    } else {
      console.log(session);
      console.log(updates);
    }
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col text-white gap-6">
        <div className="bg-cover bg-no-repeat rounded-2xl h-96 w-full bg-[url(https://m.media-amazon.com/images/I/91EQ0zyctlL._AC_UF1000,1000_QL80_.jpg)]"></div>
        <div className="flex">
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl">Rendezvous with Rama</h2>
            <p className="text-[#9797b0]">Arthur C. Clarke</p>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-12 bg-slate-500 flex justify-center items-center rounded-full text-xl">{avgRating || "-"}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">Description</h3>
          <p className="text-[#9797b0]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sequi dolores autem unde non suscipit eos eligendi minima maxime.
            Aliquid placeat facilis quo, aspernatur libero nisi sit facere! Totam rem vel, delectus dignissimos deleniti natus minima asperiores
            tempora. Repudiandae, repellat accusantium fugiat velit beatae exercitationem veritatis perspiciatis labore placeat pariatur?
          </p>
        </div>
        {!isLoading && (
          <form className="card-body p-4 my-8 border rounded-lg bg-slate-200 flex flex-col gap-4" onSubmit={handleSubmit(updateRating)}>
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
