import { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState } from "react";

type Props = {
  session?: Session;
  avatar?: string;
};

export const Navbar = ({ session, avatar }: Props) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);

  const logOut = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      <div className="justify-between px-4 flex max-w-2xl m-auto text-white pt-8">
        <div className="min-w-20 flex">
          {session && (
            <Link to={"/profil"} className="w-12 h-12 bg-red-300 rounded-full" onClick={() => setShowHamburgerMenu(false)}>
              <img src={avatar || ""} />
            </Link>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to={"/"} className="font-bold text-2xl" onClick={() => setShowHamburgerMenu(false)}>
            BustyBooks
          </Link>
        </div>
        <div className="flex items-center justify-end min-w-20">
          <button className="ml-2 text-4xl" onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}>
            {session ? (
              "🍔"
            ) : (
              <Link to={"/profil"} className="font-bold text-sm">
                Logg inn
              </Link>
            )}
          </button>
        </div>
      </div>
      {showHamburgerMenu && (
        <div className="absolute w-full h-full bg-[#272736] z-10">
          <ul className="text-white font-bold px-2 flex flex-col justify-center items-center mt-20 gap-8">
            <li>
              <Link to={"/mine-ratinger"} onClick={() => setShowHamburgerMenu(false)}>
                Mine ratinger
              </Link>
            </li>
            <li>
              <button className="p-2 bg-slate-500 rounded-lg" onClick={session ? logOut : undefined}>
                {session ? "Logg ut" : ""}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
