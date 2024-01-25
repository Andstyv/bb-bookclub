import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/gotrue-js";
import { Rating } from "../types/types";

type Props = {
  session?: Session;
  id?: string;
};

export const useGetRatingByUserAndBookId = ({ session, id }: Props) => {
  const [userRatingByBookId, setUserRatingByBookId] = useState<Rating | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;

    const fetchRatingByUserAndBookId = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("ratings")
        .select()
        .eq("user_id", session?.user.id)
        .eq("book_id", id)
        .order("created_at", { ascending: false });
      if (!ignore) {
        if (error) {
          console.log(error);
        } else if (data) {
          setUserRatingByBookId(data[0] || null);
        }
      }
      setIsLoading(false);
    };
    fetchRatingByUserAndBookId();

    return () => {
      ignore = true;
    };
  }, [session, id]);

  return { userRatingByBookId, isLoading };
};
