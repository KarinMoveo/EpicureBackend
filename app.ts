import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { db } from "./src/db/connectMongoDB";

import restaurantRoute from "./src/routes/restaurantRoute";
import chefRoute from "./src/routes/chefRoute";
import dishRoute from "./src/routes/dishRoute";
import userRoute from "./src/routes/userRoute";
import CustomError from "./src/shared/CustomError";
import authMiddleware from "./src/shared/authMiddleware";

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  
};

app.use(cors(corsOptions));
app.use(cookieParser());


app.use(express.static("assets"));
app.use(express.json());

app.use("/auth", userRoute);
// app.use(authMiddleware);


app.use("/restaurants", restaurantRoute);
app.use("/chefs", chefRoute);
app.use("/dishes", dishRoute);

const port = process.env.PORT || 5000;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }
  return res.status(500).json({ status: 500, message: error.message });
});


db.then(() => {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
