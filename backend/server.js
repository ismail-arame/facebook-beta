const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

//readdirSync() method is used to synchronously read the contents of a given directory. The method returns an array with all the file names or objects in the directory
const { readdirSync } = require("fs");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    useSuccessStatus: 200,
  })
);

//to parse any incoming JSON data
app.use(express.json());
// console.log(readdirSync("./routes"));

//Routes
readdirSync("./routes").map((routeFile) =>
  app.use("/", require("./routes/" + routeFile))
);

// MONGO database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongodb conncted successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}...`);
});
