import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type FormValues = {
  username: string;
};

type SessionProps = {
  session: Session;
};

export default function AccountView({ session }: SessionProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
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
          setAvatar(data.avatar_url);
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
    const randomNumber = Math.floor(Math.random() * 99 + 1);

    const updates = {
      id: user.id,
      username: formData.username,
      updated_at: new Date(),
      avatar_url: `https://avatar.iran.liara.run/public/${randomNumber}`,
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
      return;
    }
    toast.success(`Brukernavn ${username ? "oppdatert" : "registrert"}`, {
      duration: 3000,
      position: "bottom-center",
    });
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col items-center text-white mt-12">
        <div className="bg-[#393848] p-8 rounded shadow-md w-full max-w-xl">
          <h1 className="text-center text-2xl font-semibold mb-6">{username ? "Din Profil" : "Legg til brukernavn"}</h1>
          <div className="flex justify-center items-center my-4">
            {avatar ? <img src={avatar} className="w-24 h-24" /> : <div className="w-24 h-24 bg-slate-200 rounded-full"></div>}
          </div>
          <form onSubmit={handleSubmit(updateProfile)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                E-post
              </label>
              <input
                id="email"
                type="text"
                className=" italic text-gray-600 border rounded px-3 py-2 w-full focus:outline-none bg-gray-200"
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
                {loading ? "Laster ..." : username ? "Oppdater informasjon" : "Opprett brukernavn"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
