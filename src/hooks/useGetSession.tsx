import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useGetSession = () => {
  const [session, setSession] = useState<Session>();
  const [loadingSession, setLoadingSession] = useState<boolean | null>(true);

  useEffect(() => {
    setLoadingSession(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? undefined);
      setLoadingSession(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? undefined);
      setLoadingSession(false);
    });
  }, []);

  return { session, loadingSession };
};
