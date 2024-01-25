import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthView() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert("Login link sendt til e-post!");
    }
    setLoading(false);
  };

  return (
    <div className="row flex flex-center mt-24">
      <div className="border p-8 bg-slate-200 rounded-lg">
        <h1 className="font-bold text-2xl text-center">Logg inn / opprett bruker</h1>
        <form className="" onSubmit={handleLogin}>
          <div>
            <input
              className="p-2 rounded-lg mt-8 w-full"
              type="email"
              placeholder="Din e-post"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center mt-8">
            <button className="bg-red-200 p-2 rounded-lg" disabled={loading}>
              {loading ? <span>Laster</span> : <span>Bekreft</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
