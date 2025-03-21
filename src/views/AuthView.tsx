import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/useAuthStore";

type ErrResponse = {
  message: string;
};

export default function AuthView() {
  const { isAuthenticated } = useAuthStore();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const typedError = err as ErrResponse;
      setError(typedError.message);
    }
    setLoading(false);
  };

  if (!loading)
    return (
      <>
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
        </div>
        {error && <div className="text-red-500 mt-8">{error}</div>}
      </>
    );
}
