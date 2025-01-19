import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Rating } from "../../types/types";

export const useGetAllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoadingAllRatings, setIstLoadingAllRatings] = useState<boolean>(false);

  useEffect(() => {
    setIstLoadingAllRatings(true);
    const fetchAllRatings = async () => {
      const { data, error } = await supabase.from("ratings").select().order("created_at", { ascending: false });
      if (error) {
        console.log(error);
        return;
      }
      setRatings(data);
      setIstLoadingAllRatings(false);
    };

    fetchAllRatings();
  }, []);

  return { ratings, isLoadingAllRatings };
};
