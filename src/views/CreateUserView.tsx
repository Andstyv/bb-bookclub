import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { pb } from "../utils/pocketBaseUtils";

export default function CreateUserView() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 99 + 1);

    try {
      // Create the user if they don't exist
      await pb.collection("users").create({
        email: email,
        password: password,
        passwordConfirm: password,
        name: username,
        avatar_url: `https://avatar.iran.liara.run/public/${randomNumber}`,
      });

      // Log the user in after creating their account
      await pb.collection("users").authWithPassword(email, password);

      toast.success("Bruker opprettet og innlogget", {
        duration: 5000,
        position: "bottom-center",
      });
      if (pb.authStore.isValid) {
        navigate("/");
        navigate(0);
      }
    } catch (createError) {
      toast.error("Kunne ikke opprette bruker.", {
        duration: 5000,
        position: "bottom-center",
      });
    }

    setLoading(false);
  };

  return (
    <div className="row flex flex-center mt-24">
      <div className="p-8 bg-bb_primary rounded-lg">
        <h1 className="font-bold text-2xl text-center text-white text-wrap max-w-xs">Opprett bruker</h1>
        <form className="max-w-80" onSubmit={handleCreateUser}>
          <div>
            <input
              className="p-2 rounded-lg mt-8 w-full"
              type="text"
              placeholder="Brukernavn"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
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
