import { Duration } from "date-fns";
import { Link } from "react-router-dom";
import { useGetBookById } from "../hooks/useGetBookById";

type Props = {
  currentBookId: string;
  daysLeft: Duration;
};

export const CurrentBook = ({ currentBookId, daysLeft }: Props) => {
  const { book } = useGetBookById(currentBookId);

  return (
    <>
      {book && (
        <div className="w-full max-w-xs flex flex-col gap-2 text-white mt-10">
          <h1 className="text-2xl mb-1 font-semibold">Nå leses:</h1>
          <Link to={`detaljer/${book.id}`} className="cursor-pointer hover:brightness-110 transition-all mb-10">
            <img src={book.cover_img_url} className="filter object-cover object-top w-full h-64" />
            <div className="flex flex-col justify-end h-full">
              <div className="py-2 bg-bb_primary  transition-all pl-4 rounded-t-none text-white rounded-xl">
                <p className="text-2xl font-semibold">{book.title}</p>
                <p>{book.author}</p>
              </div>
            </div>
          </Link>
          {/* <h2 className="mt-2 text-xl text-center mb-0">Gjenstående tid:</h2> */}
          {/* <div className="bg-bb_btn rounded-lg flex justify-center py-2 px-4 font-semibold text-lg m-auto">{daysLeft.days} dager</div> */}
        </div>
      )}
    </>
  );
};
