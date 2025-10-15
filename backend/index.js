const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is runing PORT : ", PORT));
mongoose
  .connect(process.env.DATABASIC_URL)
  .then(() => console.log("Databasic Connected..."))
  .catch((error) => console.log("Databasice not connected again check... !"));

studentSchema = new mongoose.Schema({
  regNumber: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  department: { type: String, required: true },
});
const Student = mongoose.model("Student", studentSchema);
app.get("/", (req, res) => {
  res.status(200).send({ Message: "Frontent_Backend_BasicProject" });
});
app.post("/user", async (req, res) => {
  try {
    const { regNumber, name, course, department } = req.body;
    const student = new Student({ regNumber, name, course, department });
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ Message: " Student not create please try again ... ! " });
  }
});
app.get("/user", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ Message: "You should check url please .... !" });
  }
});
app.put("/user/:id", async (req, res) => {
  const { name, course, department } = req.body;
  try {
    const updatedDocument = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        course,
        department,
      },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ Message: "Document not found" });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(400).json({ Message: "Invalid ID or update details" });
  }
});
