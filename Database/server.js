const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;

// ✅ MongoDB Setup
const uri = "mongodb+srv://siddharthchauhan_0:Siddharth0@cluster0.y4bqnrh.mongodb.net/";
const client = new MongoClient(uri);
const dbName = "SCHOOL";

let collection;

// ✅ Connect to MongoDB once
async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  collection = db.collection("StudentInfo");
  console.log("✅ Connected to MongoDB");
}
connectDB();

app.use(cors());
app.use(express.json());

// 🔹 GET all students
app.get("/students", async (req, res) => {
  const students = await collection.find().toArray();
  res.json(students);
});

// 🔹 POST a new student
app.post("/students", async (req, res) => {
  const student = req.body;
  const result = await collection.insertOne(student);
  res.json({ insertedId: result.insertedId });
});

// 🔹 PUT: update student by ID
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updated }
  );
  res.json(result);
});

// 🔹 DELETE student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.json(result);
});

// ✅ Start Express Server
app.listen(port, () => {
  console.log(`🚀 Express server running at http://localhost:${port}`);
});
