import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useGetAvgRatingForBook = (id?: string) => {
  const [avgRating, setAvgRating] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDaysAvailableData = async () => {
      setIsLoading(true);

      const { data } = await supabase.from("ratings").select();

      if (data) {
        setIsLoading(false);
        console.log(data);
        console.log(id);
        const filteredData = data.filter((book) => book.book_id == id);
        console.log(filteredData);
        const avgBookRating = filteredData.reduce((a, { rating_score }) => a + rating_score, 0) / filteredData.length;
        if (avgBookRating) setAvgRating(avgBookRating.toFixed(2));
      }
    };
    fetchDaysAvailableData();
  }, [id]);

  return { avgRating, isLoading };
};
