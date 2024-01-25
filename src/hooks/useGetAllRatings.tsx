import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";

export const useGetAllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllRatings = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("ratings").select().order("created_at", { ascending: false });
      if (data) {
        setIsLoading(false);
        setRatings(data);
      }
    };
    fetchAllRatings();
  }, []);

  return { ratings, isLoading };
};
