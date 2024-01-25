import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/gotrue-js";
import { Rating } from "../types/types";

type Props = {
  session?: Session;
  id?: string;
};

export const useGetRatingsByUser = ({ session, id }: Props) => {
  const [userRating, setUserRating] = useState<Rating | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    console.log("useGetRatingsByUser called");

    const fetchDaysAvailableData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("ratings").select().eq("user_id", session?.user.id).order("created_at", { ascending: false });
      console.log("useGetRatingsByUser data fetched");

      if (!ignore) {
        if (error) {
          console.log(error);
        } else if (data) {
          const matchingRating = data.find((el) => el.book_id == id);
          console.log(matchingRating);
          setUserRating(matchingRating || null);
        }
      }
      setIsLoading(false);
    };
    fetchDaysAvailableData();

    return () => {
      ignore = true;
    };
  }, [session, id]);

  return { userRating, isLoading };
};
