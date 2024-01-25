import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";

type Props = {
  session?: Session | null;
};

export const useGetAllRatingsByUser = ({ session }: Props) => {
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useGetAllRatingsByUser called");
    const fetchDaysAvailableData = async () => {
      if (session) {
        setIsLoading(true);
        const { data } = await supabase.from("ratings").select().eq("user_id", session?.user.id).order("created_at", { ascending: false });
        console.log("useGetAllRatingsByUser data fetched");

        if (data) {
          console.log(data);
          setIsLoading(false);
          setUserRatings(data);
        }
      }
    };
    fetchDaysAvailableData();
  }, [session]);

  return { userRatings, isLoading };
};
