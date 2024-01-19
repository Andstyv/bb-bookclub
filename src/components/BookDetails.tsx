export const BookDetails = () => {
  return (
    <>
      <div className="flex w-full max-w-2xl flex-col text-white gap-6">
        <div className="bg-cover bg-no-repeat rounded-2xl h-96 w-full bg-[url(https://m.media-amazon.com/images/I/91EQ0zyctlL._AC_UF1000,1000_QL80_.jpg)]"></div>
        <div className="flex">
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl">Rendezvous with Rama</h2>
            <p className="text-[#9797b0]">Arthur C. Clarke</p>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-12 bg-slate-500 flex justify-center items-center rounded-full text-xl">8.4</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">Description</h3>
          <p className="text-[#9797b0]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, sequi dolores autem unde non suscipit eos eligendi minima maxime.
            Aliquid placeat facilis quo, aspernatur libero nisi sit facere! Totam rem vel, delectus dignissimos deleniti natus minima asperiores
            tempora. Repudiandae, repellat accusantium fugiat velit beatae exercitationem veritatis perspiciatis labore placeat pariatur?
          </p>
        </div>
        <button className="bg-red-600 mt-auto p-4 rounded-lg">Gi rating</button>
      </div>
    </>
  );
};
