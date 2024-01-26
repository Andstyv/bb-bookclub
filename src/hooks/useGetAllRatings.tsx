import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";

export const useGetAllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllRatings = async () => {
      const { data, error } = await supabase.from("ratings").select().order("created_at", { ascending: false });
      if (error) {
        console.log(error);
        return;
      }
      setRatings(data);
      setIsLoading(false);
    };

    fetchAllRatings();
  }, []);

  return { ratings, isLoading };
};
