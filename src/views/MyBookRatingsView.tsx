import { RatingCard } from "../components/RatingCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useSupabase } from "../hooks/useSupabase";
import { getAllRatingsByUserId, getAllRatingsByUserId2 } from "../services/supaservice";
import { Rating } from "../types/types";
import { list } from "postcss";

type Props = {
  session?: Session;
  loadingSession: boolean | null;
};

export const MyBookRatingsView = ({ session, loadingSession }: Props) => {
  // const { data: allRatingsByUser, loading, error } = useSupabase(() => getAllRatingsByUserId(session?.user.id));
  const allRatingsByUser = useSupabase(() => getAllRatingsByUserId2());
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!session && !loadingSession) {
  //     navigate("/");
  //   }
  // }, [session, loadingSession, navigate]);

  // if (error) {
  //   return (
  //     <>
  //       <div>An error occured</div>
  //       <div>{error.message}</div>
  //     </>
  //   );
  // }

  console.log(allRatingsByUser);

  return (
    <div className="w-full flex flex-col gap-4 mt-20">
      <h1 className="font-bold text-2xl text-white">Mine ratinger:</h1>
      {allRatingsByUser && allRatingsByUser.map((book: Rating) => <RatingCard key={book.id} book={book} />)}
    </div>
  );
};
