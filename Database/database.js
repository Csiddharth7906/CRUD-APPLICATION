const fs = require("fs");
const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://siddharthchauhan_0:Siddharth0@cluster0.y4bqnrh.mongodb.net/";
const client = new MongoClient(url);
const dbName = "SCHOOL";

// ✅ Load JSON data
const data = require("./Student.json"); // ✅ this works because it's JSON

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("StudentInfo");
  const insertResult = await collection.insertMany(data);
   console.log('Inserted documents =>', insertResult);
  return "done.";
  }

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
