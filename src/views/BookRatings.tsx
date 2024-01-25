import { RatingCard } from "../components/RatingCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllRatingsByUser } from "../hooks/useGetAllRatingsByUser";
import { Session } from "@supabase/supabase-js";

type Props = {
  session?: Session;
  loadingSession: boolean | null;
};

export const BookRatings = ({ session, loadingSession }: Props) => {
  const { userRatings, isLoading } = useGetAllRatingsByUser({ session });
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !loadingSession) {
      navigate("/");
    }
  }, [session, loadingSession, navigate]);

  return (
    <div className="w-full flex flex-col gap-4 mt-20">
      <h1 className="font-bold text-2xl text-white">Mine ratinger:</h1>
      {userRatings && !isLoading && userRatings.map((book) => <RatingCard key={book.id} book={book} />)}
    </div>
  );
};
