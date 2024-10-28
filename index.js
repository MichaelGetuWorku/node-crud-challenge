const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const personRoute = require("./routes/personRoutes");

app.use(cors());
app.use(express.json());

let persons = [{
  id: '1',
  name: 'Sam',
  age: 26,
  hobbies: []    
}] 

app.set("db", persons);

app.use("/person", personRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the ${req.originalUrl} on server`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}
module.exports = app;
