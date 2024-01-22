import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useGetAvgRatingForBook = (isbn: string) => {
  const [avgRating, setAvgRating] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDaysAvailableData = async () => {
      setIsLoading(true);

      const { data } = await supabase.from("ratings").select();

      if (data) {
        setIsLoading(false);
        const filteredData = data.filter((book) => (book.book_isbn = isbn));
        const avgBookRating = filteredData.reduce((a, { rating_score }) => a + rating_score, 0) / filteredData.length;
        setAvgRating(avgBookRating.toFixed(2));
      }
    };
    fetchDaysAvailableData();
  }, [isbn]);

  return { avgRating, isLoading };
};
