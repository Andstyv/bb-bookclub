import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getPb } from "../utils/pocketBaseUtils";
import { AuthRecord } from "pocketbase";

type FormValues = {
  username: string;
};

type SessionProps = {
  session: AuthRecord;
};

export default function AccountView({ session }: SessionProps) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // const [dummy, setDummy] = useState(0);
  const { register, handleSubmit } = useForm<FormValues>();
  const pb = getPb();

  console.log(session);

  // useEffect(() => {
  //   let ignore = false;
  //   async function getProfile() {
  //     setLoading(true);
  //     const { user } = session;
  //     // const { data, error } = await supabase.from("profiles").select(`username, avatar_url`).eq("id", user.id).single();

  //     const record = await pb.collection("users").getOne(`${pb.authStore.record?.id}`, {
  //       expand: "relField1,relField2.subRelField",
  //     });

  //     if (!ignore) {
  //       if (error) {
  //         console.warn(error);
  //       } else if (data) {
  //         setUsername(data.username);
  //         setAvatar(data.avatar_url);
  //       }
  //     }
  //     setLoading(false);
  //   }
  //   getProfile();

  //   return () => {
  //     ignore = true;
  //   };
  // }, [session]);

  async function updateProfile(formData: FieldValues) {
    setLoading(true);
    // const { user } = session;
    const randomNumber = Math.floor(Math.random() * 99 + 1);

    // const updates = {
    //   id: session?.id,
    //   username: formData.username,
    //   updated_at: new Date(),
    //   avatar_url: `https://avatar.iran.liara.run/public/${randomNumber}`,
    // };

    const data = {
      name: formData.username,
    };

    const record = await pb.collection("users").update(`${session?.id}`, data);

    console.log("RECORD", record);

    // const { error } = await supabase.from("profiles").upsert(updates);

    if (record.code) {
      alert(record.message);
      return;
    }
    toast.success(`Brukernavn ${session?.name ? "oppdatert" : "registrert"}`, {
      duration: 3000,
      position: "bottom-center",
    });
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col items-center text-white mt-12 w-full max-w-sm">
        <div className="bg-bb_primary p-8 rounded shadow-md w-full max-w-xl min-h-96">
          {loading && <div className="text-center mt-20">Laster..</div>}
          {!loading && (
            <>
              <h1 className="text-center text-2xl font-semibold mb-6">{session?.name ? "Din Profil" : "Legg til brukernavn"}</h1>
              <div className="flex justify-center items-center my-4">
                {avatar ? <img src={avatar} className="w-24 h-24" /> : <div className="w-24 h-24 bg-bb_secondary rounded-full"></div>}
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
                    value={session?.email}
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
                    defaultValue={session?.name || ""}
                    {...register("username")}
                    maxLength={14}
                  />
                </div>
                <div className="flex justify-center">
                  <button className="py-2 px-2 rounded-lg bg-bb_btn hover:brightness-110 transition-all font-bold" type="submit" disabled={loading}>
                    {loading ? "Laster ..." : session?.name ? "Oppdater informasjon" : "Opprett brukernavn"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}
