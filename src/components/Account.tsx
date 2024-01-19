import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { FieldValues, useForm } from "react-hook-form";

type FormValues = {
  username: string;
};

type SessionProps = {
  session: Session;
};

export default function Account({ session }: SessionProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase.from("profiles").select(`username, avatar_url`).eq("id", user.id).single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(formData: FieldValues) {
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username: formData.username,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col items-center text-white">
        <div className="bg-[#393848] p-8 rounded shadow-md w-full max-w-xl">
          <h1 className="text-2xl font-semibold mb-6">Din profil</h1>
          <form onSubmit={handleSubmit(updateProfile)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                E-post
              </label>
              <input
                id="email"
                type="text"
                className="text-black border rounded px-3 py-2 w-full focus:outline-none bg-gray-200"
                value={session.user.email}
                disabled
              />
            </div>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-bold mb-2">
                Brukernavn
              </label>
              <input
                id="username"
                type="text"
                className="text-black border rounded px-3 py-2 w-full focus:outline-none "
                required
                defaultValue={username || ""}
                {...register("username")}
              />
            </div>
            <div className="flex justify-center">
              <button className="py-2 px-2 rounded-lg bg-yellow-600 font-bold" type="submit" disabled={loading}>
                {loading ? "Laster ..." : "Oppdater informasjon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
