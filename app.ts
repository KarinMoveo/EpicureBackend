import express from 'express';
import restaurantsRoute from './src/routes/restaurantsRoute';
import chefRoute from './src/routes/chefRoute';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.static('assets'))
app.use(express.json());
app.use("/restaurants", restaurantsRoute);
app.use("/chefs", chefRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

