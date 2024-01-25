import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";

export const useGetAllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
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
