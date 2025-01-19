import { useEffect } from "react";
import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useGetUser } from "../hooks/useGetUser";
import { useSupabase } from "../hooks/useSupabase";
import { getAllRatings } from "../services/supaservice";

type Props = {
  session?: Session;
};

export const HomeView = ({ session }: Props) => {
  const { userData } = useGetUser({ session });
  const { loading: isLoadingAllRatings, data: ratings, error } = useSupabase(getAllRatings);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && !userData.username) {
      navigate("/profil");
    }
  }, [userData, navigate]);

  if (error) {
    return (
      <>
        <div>An error occured</div>
        <div>{error.message}</div>
      </>
    );
  }

  return (
    <>
      <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
      {ratings && !isLoadingAllRatings && <LatestRatings ratings={ratings} />}
    </>
  );
};
