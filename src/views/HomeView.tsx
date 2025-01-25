import { useEffect } from "react";
import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { useGetUser } from "../hooks/useGetUser";
import { getPb } from "../utils/pocketBaseUtils";
import { ratings } from "../books/ratings";

type Props = {
  session?: Session;
};

export const HomeView = ({ session }: Props) => {
  const { userData } = useGetUser({ session });
  // const { loading: isLoadingAllRatings, data: ratings, error } = useSupabase(getAllRatings);
  const pb = getPb();
  console.log(pb.authStore.record);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && !userData.username) {
      navigate("/profil");
    }
  }, [userData, navigate]);

  // if (error) {
  //   return (
  //     <>
  //       <div>An error occured</div>
  //       <div>{error.message}</div>
  //     </>
  //   );
  // }

  return (
    <>
      <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
      {ratings && <LatestRatings ratings={ratings} />}
    </>
  );
};
