const express = require("express");
const app = express();

app.get('/', (req : any, res: any) => {
    res.send('Hello, Express! This is the develop branch');
  });
  
  const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
