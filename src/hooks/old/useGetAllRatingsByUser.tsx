import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { Rating } from "../../types/types";

type Props = {
  session?: Session | null;
};

export const useGetAllRatingsByUser = ({ session }: Props) => {
  const [allRatingsByUser, setAllRatingsByUser] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllRatingsByUser = async () => {
      if (session) {
        setIsLoading(true);
        const { data } = await supabase.from("ratings").select().eq("user_id", session?.user.id).order("created_at", { ascending: false });
        if (data) {
          setIsLoading(false);
          setAllRatingsByUser(data);
        }
      }
    };
    fetchAllRatingsByUser();
  }, [session]);

  return { allRatingsByUser, isLoading };
};
