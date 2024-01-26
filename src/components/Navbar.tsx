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
            <Link to={"/profil"} className="w-12 h-12 bg-bb_secondary rounded-full" onClick={() => setShowHamburgerMenu(false)}>
              <img src={avatar || ""} />
            </Link>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to={"/"} className="font-bold text-4xl" onClick={() => setShowHamburgerMenu(false)}>
            BustyBooks
          </Link>
        </div>
        <div className="flex items-center justify-end min-w-20">
          <button
            className={`ml-2 text-4xl ${showHamburgerMenu ? "rotate-90 transition-all" : "transition-all"}`}
            onClick={session ? () => setShowHamburgerMenu(!showHamburgerMenu) : undefined}
          >
            {session ? (
              "🍔"
            ) : (
              <Link to={"/profil"} className="font-bold text-xs p-1 bg-bb_secondary hover:brightness-110 rounded-lg">
                Logg inn
              </Link>
            )}
          </button>
        </div>
      </div>
      {showHamburgerMenu && (
        <div className="absolute w-full h-full bg-bb_bg z-10">
          <ul className="text-white font-bold px-2 flex flex-col justify-center items-center mt-20 gap-12">
            <li>
              <Link
                to={"/mine-ratinger"}
                onClick={() => setShowHamburgerMenu(false)}
                className=" line hover:text-bb_secondary transition-all pb-1 border-b-2"
              >
                Mine ratinger
              </Link>
            </li>
            <li>
              <button className="transition-all hover:scale-110 hover:brightness-110 p-2 bg-bb_btn rounded-lg" onClick={session ? logOut : undefined}>
                {session ? "Logg ut" : ""}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
