import express from 'express';
const app = express();
import restaurantsRoute from './src/routes/restaurantsRoute';
import chefRoute from './src/routes/chefRoute';

app.use(express.json());
app.use("/restaurants", restaurantsRoute);
app.use("/chefs", chefRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

