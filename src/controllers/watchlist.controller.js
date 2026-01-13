import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  try {
    const {movieId, status, rating, notes} = req.body;

    //Verify movie exists
    const movie = await prisma.movie.findUnique({
      where: {id: movieId},
    });

    if (!movie) {
      return res.status(404).json({status:"failed", error: "Movie not found"});
    };

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
      where: {userId_movieId: {
        userId: req.user.id,
        movieId
      }}
    });

    if (existingInWatchlist) {
      return res.status(400).json({status:"failed", error: "Movie already in the Watchlist"});
    };

    const watchListItem = await prisma.watchlistItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes
      }
    });

    return res.status(201).json({
      status: "success",
      data: watchListItem
    });
  } catch (error) {
    return res.status(500).json({status: "failed", error: error.message});
  }
}

const removeFromWatchlistItem = async (req, res) => {
  try {
    const watchListItem = await prisma.watchlistItem.findUnique({
      where: {id: req.params.id}
    });

    if(!watchListItem) {
      return res
              .status(404)
              .json({
                status: "failed",
                message: "Watchlist item not found"
              });
    }

    if(watchListItem.userId !== req.user.id) {
      return res
              .status(403)
              .json({
                status: "failed",
                message: "Not allowed to delete this watchlist item"
              })
    }

    await prisma.watchlistItem.delete({
      where: {id: req.params.id}
    });

    return res.status(200).json({
      status: "success",
      message: "Movie removed from Watchlist"
    });
  } catch (error) {
    return res.status(500).json({status: "failed", message: "Internal server error"})
  }
};

const updateWatchlistItem = async (req, res) => {
  try {
    const {status, rating, notes} = req.body;

    //Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: {id: req.params.id}
    });

    if(!watchlistItem) {
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Watchlist item not found"
        });
    };

    if(watchlistItem.userId !== req.user.id) {
      return res
              .status(403)
              .json({
                status: "failed",
                message: "Not allowed to edit this watchlist item"
              })
    };

    const updateData = {};

    if(status !== undefined) updateData.status = status.toUpperCase();
    if(rating !== undefined) updateData.rating = rating;
    if(notes !== undefined) updateData.notes = notes;

    const updatedItem = await prisma.watchlistItem.update({
      where: {id: req.params.id},
      data: updateData
    })

    return res.status(200).json({
      status: "success",
      message: "Updated the WatchlistItem",
      data: updatedItem
    })
  } catch (error) {
    return res.status(500).json({status: "failed", message: "Internal server error"})
  }
}

export {addToWatchlist, removeFromWatchlistItem, updateWatchlistItem};