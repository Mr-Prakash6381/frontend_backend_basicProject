const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is runing PORT : ", PORT));
mongoose
  .connect(process.env.DATABASIC_URL)
  .then(() => console.log("Databasic Connected..."))
  .catch((error) => console.log("Databasice not connected again check... !"));


userSchema=new mongoose.Schema({
    
})

app.get("/", (req, res) => {
  res.status(200).send({ Message: "Frontent_Backend_BasicProject" });
});
