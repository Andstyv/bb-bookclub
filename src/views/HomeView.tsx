import { useEffect } from "react";
import { CurrentBook } from "../components/CurrentBook";
import { LatestRatings } from "../components/LatestRatings";
import { currentBookId, daysLeft } from "../constants/currentBookInfo";
import { useNavigate } from "react-router-dom";
import { AuthRecord } from "pocketbase";
import { getAllRatingsPocket } from "../services/pocketservice";
import { usePocketBase } from "../hooks/usePocketbase";

type Props = {
  session?: AuthRecord;
};

export const HomeView = ({ session }: Props) => {
  const navigate = useNavigate();
  const { loading, data: allRatings, error } = usePocketBase(() => getAllRatingsPocket());

  useEffect(() => {
    if (session && !session.id) {
      navigate("/profil");
    }
  }, [session, navigate]);

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return (
      <>
        <div>An error occured</div>
        <div>{error.message}</div>
      </>
    );
  }

  console.log(allRatings);

  return (
    <>
      <CurrentBook currentBookId={currentBookId} daysLeft={daysLeft} />
      {allRatings && !loading && <LatestRatings ratings={allRatings} session={session} />}
    </>
  );
};
