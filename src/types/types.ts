export interface Rating {
  id: number;
  created_at: Date;
  user_id: string;
  username: string;
  book_isbn: string;
  rating_score: number;
  book_title: string;
  author_name: string;
  book_id: number;
  book_description: string;
  book_cover_url: string;
}

export interface User {
  id: string;
  updated_at: string;
  username: string;
  avatar_url: string;
}

export type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  description: string;
  cover_img_url: string;
};
