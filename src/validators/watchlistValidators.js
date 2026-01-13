import {z} from 'zod';

const WatchlistStatusEnum = z.enum(
  ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"],
  {
    error: () => ({
      message:
        "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
    }),
  }
);

const RatingSchema = z.coerce
  .number()
  .int("Rating must be an integer")
  .min(1, "Rating must be between 1 and 10")
  .max(10, "Rating must be between 1 and 10");

const NotesSchema = z.string().max(1000).optional();

const watchlistBaseSchema = {
  status: WatchlistStatusEnum.optional(),
  rating: RatingSchema.optional(),
  notes: NotesSchema,
};

const addToWatchlistSchema = z.object({
  // movieId, status, rating, notes
  movieId: z.string().uuid("Invalid movieId"),
  ...watchlistBaseSchema
});

const updateWatchlistSchema = z.object({
    // status, rating, notes
    ...watchlistBaseSchema
}).refine(
  (data) => 
    data.status !== undefined ||
    data.rating !== undefined ||
    data.notes !== undefined,
    {
      message: "At least one field must be provided to update"
    }
);

export {addToWatchlistSchema, updateWatchlistSchema};