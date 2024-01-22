import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/gotrue-js";

type Props = {
  session?: Session;
  currentBookISBN: string;
};

interface UserRating {
  created_at: string;
  user_id: string;
  username: string;
  book_isbn: string;
  rating_score: number;
  book_title: string;
  author_name: string;
}

export const useGetRatingsByUser = ({ session, currentBookISBN }: Props) => {
  const [userRating, setUserRating] = useState<UserRating | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useGetRatingsByUser called");
    const fetchDaysAvailableData = async () => {
      if (session) {
        setIsLoading(true);
        const { data } = await supabase.from("ratings").select().eq("user_id", session?.user.id).order("created_at", { ascending: false });
        console.log("useGetRatingsByUser data fetched");

        if (data) {
          console.log(data);
          const matchingRating = data.find((el) => (el.book_isbn = currentBookISBN));
          console.log(matchingRating);
          setIsLoading(false);
          setUserRating(matchingRating || null);
        }
      }
    };
    fetchDaysAvailableData();
  }, [session, currentBookISBN]);

  return { userRating, isLoading };
};
