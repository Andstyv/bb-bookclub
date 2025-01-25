import { Session, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { Rating } from "../types/types";
import { getPb } from "../utils/pocketBaseUtils";

export const getAllRatings = async () => {
  const { data, error } = await supabase.from("ratings").select();
  return { data, error };
};

export const getAllRatingsByUserId = async (userId: string | undefined) => {
  const { data, error } = await supabase.from("ratings").select().eq("user_id", userId).order("created_at", { ascending: false });

  return { data, error };
};

export const getAllRatingsByUserId2 = async () => {
  const pb = getPb();
  const userId = pb.authStore.record?.id;
  const list = await pb.collection("ratings").getList(1, 100, {
    filter: `user_id = "${userId}"`, // Ensure userId is enclosed in quotes
    sort: "-created",
  });

  return list.items;
};

export const getAvgRatingForBookById = async (bookId: string | undefined) => {
  const pb = getPb();
  const list = await pb.collection("ratings").getList(1, 100, {
    filter: `book_id = ${bookId}`,
    sort: "-created",
  });

  console.log(list);

  const calcAvg = (data: { items: Rating[] } | null) => {
    if (data && data.items.length > 0) {
      const sum = data.items.reduce((a, { rating_score }) => a + rating_score, 0);
      const avg = sum / data.items.length;
      return avg;
    }
    return 0;
  };

  const newData = calcAvg(list);

  return { data: newData };
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
