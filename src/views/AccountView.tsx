import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { pb } from "../utils/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/useAuthStore";

type FormValues = {
  username: string;
};

export default function AccountView() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  async function updateProfile(formData: FieldValues) {
    setLoading(true);

    const data = {
      name: formData.username,
    };

    const record = await pb.collection("users").update(`${user?.id}`, data);

    if (record.code) {
      alert(record.message);
      return;
    }

    toast.success(`Brukernavn ${user?.name ? "oppdatert" : "registrert"}`, {
      duration: 3000,
      position: "bottom-center",
    });
    setLoading(false);

    useAuthStore.getState().checkAuth();
  }
  if (user)
    return (
      <>
        <div className="flex flex-col items-center text-white mt-12 w-full max-w-sm">
          <div className="bg-bb_primary p-8 rounded shadow-md w-full max-w-xl min-h-96">
            {loading && <div className="text-center mt-20">Laster..</div>}
            {!loading && (
              <>
                <h1 className="text-center text-2xl font-semibold mb-6">{user?.name ? "Din Profil" : "Legg til brukernavn"}</h1>
                <div className="flex justify-center items-center my-4">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} className="w-24 h-24" />
                  ) : (
                    <div className="w-24 h-24 bg-bb_secondary rounded-full"></div>
                  )}
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
                      value={user?.email}
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
                      defaultValue={user?.name || ""}
                      {...register("username")}
                      maxLength={14}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button className="py-2 px-2 rounded-lg bg-bb_btn hover:brightness-110 transition-all font-bold" type="submit" disabled={loading}>
                      {loading ? "Laster ..." : user?.name ? "Oppdater informasjon" : "Opprett brukernavn"}
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
