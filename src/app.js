import express from "express";
import authRoutes from "./routes/auth.routes.js";
import watchListRoutes from "./routes/watchlist.routes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/watchlist", watchListRoutes);

app.use(errorMiddleware);

export default app;