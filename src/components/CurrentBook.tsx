import { Link } from "react-router-dom";
import { intervalToDuration } from "date-fns";

export const CurrentBook = () => {
  const result = intervalToDuration({
    start: new Date(),
    end: new Date(2024, 2, 16),
  });
  return (
    <>
      <div className="w-full flex flex-col gap-4 text-white mt-10">
        <h1 className="text-4xl mb-2 font-semibold">Nå leses:</h1>
        <Link
          to={"/detaljer"}
          className="cursor-pointer bg-[url(https://m.media-amazon.com/images/I/91EQ0zyctlL._AC_UF1000,1000_QL80_.jpg)] bg-cover bg-no-repeat h-96 w-full rounded-xl bg-"
        >
          <div className="text-black flex flex-col justify-end h-full">
            <div className="pb-4 pl-4 bg-gradient-to-b from-transparent to-black py-8 text-white rounded-xl">
              <p className="text-2xl font-semibold">Rendezvous with Rama</p>
              <p>Arthur C. Clarke</p>
            </div>
          </div>
        </Link>
        <h2 className="mt-8 text-xl text-center">Gjenstående tid:</h2>
        <div className="bg-slate-600 rounded-lg flex justify-center py-2 px-4 font-semibold text-lg m-auto">{result.days} dager</div>
      </div>
    </>
  );
};
