import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../utils/useAuthStore";

type Props = {
  avatar?: string;
};

export const Navbar = ({ avatar }: Props) => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);
  // const isLoggedIn = pb.authStore.isValid;
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowHamburgerMenu(false);
  };

  return (
    <>
      <div className="justify-between px-4 flex max-w-4xl m-auto text-white pt-8">
        <div className="min-w-20 flex">
          {isAuthenticated ? (
            <Link to={"/profil"} className="w-12 h-12 bg-bb_secondary rounded-full" onClick={() => setShowHamburgerMenu(false)}>
              <img src={avatar || ""} />
            </Link>
          ) : (
            <div className="w-48"></div>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Link to={"/"} className="font-bold text-4xl" onClick={() => setShowHamburgerMenu(false)}>
            BustBooks
          </Link>
        </div>
        <div className="flex items-center justify-end min-w-20">
          <button
            className={`text-4xl ${showHamburgerMenu ? "rotate-90 transition-all" : "transition-all"}`}
            onClick={isAuthenticated ? () => setShowHamburgerMenu(!showHamburgerMenu) : undefined}
          >
            {isAuthenticated ? (
              "🍔"
            ) : (
              <div className="w-48 flex justify-between">
                <Link to={"/logg-inn"} className="font-bold text-xs p-1 bg-bb_secondary hover:brightness-110 rounded-lg">
                  Logg inn
                </Link>
                <Link to={"/opprett-bruker"} className="font-bold text-xs p-1 bg-bb_secondary hover:brightness-110 rounded-lg">
                  Opprett bruker
                </Link>
              </div>
            )}
          </button>
        </div>
      </div>
      {showHamburgerMenu && (
        <div className="absolute w-full h-full bg-bb_bg z-10">
          <ul className="text-white font-bold px-2 flex flex-col justify-center items-center mt-20 gap-12">
            <li>
              <Link
                to={"/bøker"}
                onClick={() => setShowHamburgerMenu(false)}
                className=" line hover:text-bb_secondary transition-all pb-1 border-b-2"
              >
                Bøker
              </Link>
            </li>
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
              <button
                className="transition-all hover:scale-110 hover:brightness-110 p-2 bg-bb_btn rounded-lg"
                onClick={isAuthenticated ? handleLogout : undefined}
              >
                {isAuthenticated ? "Logg ut" : ""}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
