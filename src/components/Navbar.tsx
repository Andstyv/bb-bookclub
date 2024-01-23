import { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

type Props = {
  session?: Session;
  avatar?: string;
};

export const Navbar = ({ session, avatar }: Props) => {
  const logOut = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      <div className="justify-between px-4 flex max-w-2xl m-auto text-white pt-8">
        <div className="min-w-20 flex">
          <Link to={"/profil"} className="w-12 h-12 bg-red-300 rounded-full">
            <img src={avatar || ""} />
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to={"/"} className="font-bold text-2xl">
            BB Bokklubb
          </Link>
        </div>
        <div className="flex items-center justify-end min-w-20">
          <button onClick={session ? logOut : undefined}>{session ? "Logg ut" : ""}</button>
        </div>
      </div>
    </>
  );
};
