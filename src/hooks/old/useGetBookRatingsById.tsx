import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Rating } from "../../types/types";

export const useGetBookRatingsById = (id: string) => {
  const [bookRatings, setBookRatings] = useState<Rating[] | null>(null);
  const [isLoadingBookRatings, setIsLoadingBookRatings] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookRatings = async () => {
      setIsLoadingBookRatings(true);

      const { data } = await supabase.from("ratings").select().eq("book_id", id);

      if (data) {
        setIsLoadingBookRatings(false);
        setBookRatings(data);
      }
    };
    fetchBookRatings();
  }, [id]);

  return { bookRatings, isLoadingBookRatings };
};
