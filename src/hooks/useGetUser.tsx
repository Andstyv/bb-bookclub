import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { User } from "../types/types";

type Props = {
  session?: Session;
};

export const useGetUser = ({ session }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("profiles").select().eq("id", session?.user.id);

      if (data) {
        setIsLoading(false);
        setUserData(data[0]);
      }
    };
    fetchUser();
  }, [session]);

  return { userData, isLoading };
};
