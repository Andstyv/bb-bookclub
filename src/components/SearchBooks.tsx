import { useState } from "react";

interface Book {
  title: string;
  first_publish_year: number;
  author_name: string[];
  isbn: string[];
}

export const SearchBooks = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = `https://openlibrary.org/search.json?q=${query}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data.docs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-2 py-4 rounded-lg bg-slate-600 text-white"
          type="text"
          placeholder="Søk etter bok"
        />
        <button>Søk</button>
      </form>
      {books && books.map((book) => <div>{book.title}</div>)}
    </>
  );
};
