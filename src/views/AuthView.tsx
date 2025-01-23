import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getPb } from "../utils/pocketBaseUtils";
import { useNavigate } from "react-router-dom";

export default function AuthView() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pb = getPb();
  const navigate = useNavigate();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Try to log in the user
      await pb.collection("users").authWithPassword(email, password);
      toast.success("Innlogget", {
        duration: 5000,
        position: "bottom-center",
      });
      navigate("/");
    } catch (err) {
      // If login fails, check if it's because the user doesn't exist
      if (err?.data?.status === 400) {
        // Adjust error code if needed
        try {
          // Create the user if they don't exist
          await pb.collection("users").create({
            email: email,
            password: password,
            passwordConfirm: password,
          });

          // Log the user in after creating their account
          await pb.collection("users").authWithPassword(email, password);

          toast.success("Bruker opprettet og innlogget", {
            duration: 5000,
            position: "bottom-center",
          });
        } catch (createError) {
          toast.error("Kunne ikke opprette bruker. " + createError?.data?.message, {
            duration: 5000,
            position: "bottom-center",
          });
        }
      } else {
        // Handle other login errors
        toast.error("Innlogging feilet: " + err?.data?.message, {
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
        <h1 className="font-bold text-2xl text-center text-white">Opprett bruker</h1>
        <div>{pb.authStore.isValid ? "TRUE" : "FALSE"}</div>
        <form className="" onSubmit={handleLogin}>
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
