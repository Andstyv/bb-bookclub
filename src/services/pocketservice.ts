import { Rating } from "../types/types";
import { getPb } from "../utils/pocketBaseUtils";

const pb = getPb();

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
    });

    return { data: records, error: null };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

export const getAllRatingsPocket = async (): Promise<RatingsResponse> => {
  try {
    const records = await pb.collection("ratings").getFullList<Rating>({});

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

export const getAvgRatingForBookByIdPocket = async (bookId?: string): Promise<RatingsResponse> => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }

    const records = await pb.collection("ratings").getFullList<Rating>({
      filter: `book_id = '${bookId}'`,
      sort: "-created",
    });

    const calcAvg = (data: { items: Rating[] } | null) => {
      if (data && data.items.length > 0) {
        const sum = data.items.reduce((a, { rating_score }) => a + rating_score, 0);
        const avg = sum / data.items.length;
        return avg;
      }
      return 0;
    };

    const avgRating = calcAvg({ items: records });

    return { data: avgRating, error: null };
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return { data: null, error: error instanceof Error ? error : new Error("Unknown error") };
  }
};
