import express from "express";
import {
  addToWatchlist,
  removeFromWatchlistItem,
  updateWatchlistItem
} from "../controllers/watchlist.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { valideRequest } from "../middlewares/validateRequest.js";
import { addToWatchlistSchema, updateWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authenticate);

router.post('/', valideRequest(addToWatchlistSchema), addToWatchlist);
router.delete('/:id', removeFromWatchlistItem);
router.put('/:id', valideRequest(updateWatchlistSchema), updateWatchlistItem);

export default router;