import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

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

export const useGetAllRatings = () => {
  const [ratings, setRatings] = useState<UserRatings[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useGetAllRatingsByUser called");
    const fetchDaysAvailableData = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("ratings").select().order("created_at", { ascending: false });
      console.log("useGetAllRatingsByUser data fetched");

      if (data) {
        console.log(data);
        setIsLoading(false);
        setRatings(data);
      }
    };
    fetchDaysAvailableData();
  }, []);

  return { ratings, isLoading };
};
