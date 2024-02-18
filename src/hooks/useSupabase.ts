import { PostgrestError } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSupabase = (supaCall: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const { data, error } = await supaCall();
        if (error) {
          setError(error);
        } else {
          setData(data);
        }
      } catch (e) {
        // Likely to be a network error
      } finally {
        setLoading(false);
      }
    }
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data, error };
};
