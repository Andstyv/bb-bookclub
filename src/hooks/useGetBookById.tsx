import { useEffect, useState } from "react";
import { books } from "../books/books";
import { Book } from "../types/types";

export const useGetBookById = (bookId: string) => {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const getBookById = () => {
      const convertedId = parseFloat(bookId);
      const filteredBook = books.find((book) => book.id === convertedId);
      setBook(filteredBook);
    };
    getBookById();
  }, [bookId]);

  return { book };
};
