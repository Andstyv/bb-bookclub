import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

export interface User {
  username: string;
  full_name: string;
  avatar_url: string;
  updated_at: string;
  id: string;
}

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
        console.log(data);
        setIsLoading(false);
        setUserData(data[0]);
      }
    };
    fetchUser();
  }, [session]);

  return { userData, isLoading };
};
