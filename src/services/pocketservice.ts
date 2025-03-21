import { Rating } from "../types/types";
import { pb } from "../utils/useAuthStore";

type RatingsResponse = {
  data: Rating[] | number | null;
  error: Error | null;
};

type RatingsResponseNew = {
  data: Rating[] | null;
  error: Error | null;
};

export const getAllRatingsByUserIdPocket = async (userId?: string): Promise<RatingsResponse> => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const records = await pb.collection("ratings").getFullList<Rating>({
      filter: `user_id = '${userId}'`,
      sort: "-created",
    });

    return { data: records.length ? records : [], error: null }; // return an empty array if no ratings found
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: [], error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

export const getBookRatingsByIdPocket = async (bookId?: string): Promise<RatingsResponseNew> => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }

    const records = await pb.collection("ratings").getFullList<Rating>({
      filter: `book_id = '${bookId}'`,
      sort: "-created",
      expand: "user_id",
    });

    return { data: records, error: null };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

export const getAllRatingsPocket = async (): Promise<RatingsResponse> => {
  try {
    const records = await pb.collection("ratings").getFullList<Rating>({
      sort: "-created",
      expand: "user_id",
    });

    return { data: records, error: null };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

export const getRatingsByUserAndBookIdPocket = async (userId?: string, bookId?: string): Promise<RatingsResponse> => {
  try {
    const records = await pb.collection("ratings").getFullList<Rating>({
      filter: `user_id = '${userId}' && book_id = '${bookId}'`,
      requestKey: null,
    });

    return { data: records, error: null };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

interface RatingsResponseId {
  data: string | number | null;
  error: Error | null;
}

const calcAvg = (ratings: Rating[]): string | number => {
  if (ratings.length > 0) {
    const sum = ratings.reduce((a, { rating_score }) => a + rating_score, 0);
    const avg = sum / ratings.length;
    return avg.toFixed(1);
  }
  return 0;
};

export const getAvgRatingForBookByIdPocket = async (bookId?: string): Promise<RatingsResponseId> => {
  if (!bookId) {
    return { data: null, error: new Error("Book ID is required") };
  }

  try {
    const records = await pb.collection("ratings").getFullList<Rating>({
      filter: `book_id = '${bookId}'`,
      sort: "-created",
    });

    const avgRating = calcAvg(records);

    return { data: avgRating, error: null };
  } catch (error: unknown) {
    console.error("Error fetching ratings:", error);
    if (error instanceof Error) {
      return { data: null, error };
    }
    return { data: null, error: new Error("Unknown error") };
  }
};
