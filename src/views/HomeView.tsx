import { useEffect } from "react";
import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useGetUser } from "../hooks/useGetUser";

type Props = {
  session?: Session;
};

export const HomeView = ({ session }: Props) => {
  const { userData } = useGetUser({ session });
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && !userData.username) {
      navigate("/profil");
    }
  }, [userData, navigate]);

  return (
    <>
      <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
      <LatestRatings />
    </>
  );
};
