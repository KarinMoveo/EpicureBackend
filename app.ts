import express from "express";
import cors from "cors";

import {db} from "./connectMongoDB";

import restaurantRoute from "./src/routes/restaurantRoute";
import chefRoute from "./src/routes/chefRoute";
import dishRoute from "./src/routes/dishRoute";

const app = express();

app.use(cors());

app.use(express.static("assets"));
app.use(express.json());
app.use("/restaurants", restaurantRoute);
app.use("/chefs", chefRoute);
app.use("/dishes", dishRoute);

const port = process.env.PORT || 5000;
// app.get("/", (req: any, res: any) => {
// 	res.send("Hello, Express! This is the develop branch");
// });

db.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
