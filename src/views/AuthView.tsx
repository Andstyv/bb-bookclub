import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { pb } from "../utils/pocketBaseUtils";

export default function AuthView() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  interface ErrorResponse {
    data?: {
      message: string;
    };
  }

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);

    try {
      await pb.collection("users").authWithPassword(email, password);
      toast.success("Innlogget", {
        duration: 5000,
        position: "bottom-center",
      });
      navigate("/");
      navigate(0);
    } catch (err) {
      const typedError = err as ErrorResponse;
      if (typedError.data?.message) {
        toast.error("Innlogging feilet: " + typedError.data.message, {
          duration: 5000,
          position: "bottom-center",
        });
      } else {
        toast.error("Innlogging feilet: Unknown error occurred", {
          duration: 5000,
          position: "bottom-center",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="row flex flex-center mt-24">
      <div className="p-8 bg-bb_primary rounded-lg">
        <h1 className="font-bold text-2xl text-center text-white text-wrap max-w-xs">Logg inn</h1>
        <form className="max-w-80" onSubmit={handleLogin}>
          <div>
            <input
              className="p-2 rounded-lg mt-8 w-full"
              type="email"
              placeholder="E-post"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 rounded-lg mt-8 w-full"
              type="password"
              placeholder="Passord"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center mt-8">
            <button className="bg-bb_secondary text-white font-semibold p-2 rounded-lg" disabled={loading}>
              {loading ? <span>Laster</span> : <span>Bekreft</span>}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
