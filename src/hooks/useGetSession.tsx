import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>();
  const [loadingSession, setLoadingSession] = useState<boolean | null>(true);

  useEffect(() => {
    setLoadingSession(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoadingSession(false);
    });
  }, []);

  return { session, loadingSession };
};
