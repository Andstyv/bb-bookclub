import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useGetAvgRatingForBook = (id?: string) => {
  const [avgRatingByBookId, setAvgRatingByBookId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAvgRatingForBook = async () => {
      setIsLoading(true);

      const { data } = await supabase.from("ratings").select();

      if (data) {
        const filteredData = data.filter((book) => book.book_id == id);
        const avgBookRating = filteredData.reduce((a, { rating_score }) => a + rating_score, 0) / filteredData.length;
        setIsLoading(false);
        setAvgRatingByBookId(avgBookRating.toFixed(1));
      }
    };
    fetchAvgRatingForBook();
  }, [id]);

  return { avgRatingByBookId, isLoading };
};
