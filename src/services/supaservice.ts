import { Session, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";

export const getAllRatings = async () => {
  const { data, error } = await supabase.from("ratings").select();
  return { data, error };
};

export const getAllRatingsByUserId = async (userId: string | undefined) => {
  const { data, error } = await supabase.from("ratings").select().eq("user_id", userId).order("created_at", { ascending: false });

  return { data, error };
};

export const getAvgRatingForBookById = async (bookId: string | undefined) => {
  const { data, error } = await supabase.from("ratings").select().eq("book_id", bookId).order("created_at", { ascending: false });

  const calcAvg = (data: Rating[] | null) => {
    if (data) {
      const sum = data.reduce((a, { rating_score }) => a + rating_score, 0) / data.length;
      return sum;
    }
  };
  const newData = calcAvg(data);

  return { data: newData, error };
};

export const getBookRatingsById = async (bookId: string) => {
  const { data, error } = await supabase.from("ratings").select().eq("book_id", bookId);
  return { data, error };
};

export const getBookRatingsByIdNew = async (supabase: SupabaseClient, bookId: string) => {
  const { data, error } = await supabase.from("ratings").select().eq("book_id", bookId);
  return { data, error };
};

type RatingsByUserAndBookIdProps = {
  session: Session;
  userId: string;
};

export const getRatingsByUserAndBookId = async ({ session, userId }: RatingsByUserAndBookIdProps) => {
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("user_id", session?.user.id)
    .eq("book_id", userId)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const getUser = async ({ session }: { session: Session }) => {
  const { data, error } = await supabase.from("profiles").select().eq("id", session?.user.id);
  return { data, error };
};
