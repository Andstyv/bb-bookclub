import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

type Props = {
  session?: Session | null;
};

export interface UserRatings {
  author_name: string;
  book_isbn: string;
  book_title: string;
  created_at: string;
  id: number;
  rating_score: number;
  user_id: string;
  username: string;
}

export const useGetAllRatingsByUser = ({ session }: Props) => {
  const [userRatings, setUserRatings] = useState<UserRatings[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useGetAllRatingsByUser called");
    const fetchDaysAvailableData = async () => {
      if (session) {
        setIsLoading(true);
        const { data } = await supabase.from("ratings").select().eq("user_id", session?.user.id).order("created_at", { ascending: false });
        console.log("useGetAllRatingsByUser data fetched");

        if (data) {
          console.log(data);
          setIsLoading(false);
          setUserRatings(data);
        }
      }
    };
    fetchDaysAvailableData();
  }, [session]);

  return { userRatings, isLoading };
};
