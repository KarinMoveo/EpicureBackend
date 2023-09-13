import express from 'express';
import restaurantRoute from './src/routes/restaurantRoute';
import chefRoute from './src/routes/chefRoute';
import dishRoute from './src/routes/dishRoute';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.static('assets'))
app.use(express.json());
app.use("/restaurants", restaurantRoute);
app.use("/chefs", chefRoute);
app.use("/dishes", dishRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

