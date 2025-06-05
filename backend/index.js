const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
const UserModel = require("./models/user");
const StationModel = require("./models/station");
const { stat } = require("fs");

//new
const mapRouter = require("./map-router/map-router.js");
app.use("/map", mapRouter);

mongoose.connect("mongodb://localhost:27017/Zusers");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email, password })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(200).json("sucessfully logged in");
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })

    .catch((err) => res.json(err));

});

app.get("/stations", async (req, res) => {
  try {
    search = req.query?.search_string;
    if (!search) {
      search = "";
      const stations = await StationModel.find();
      res.status(200).send({ response: stations });
    } else {
      const stations = await StationModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ],
      });

      // If no stations are found, send a 404 response with a message
      if (stations.length === 0) {
        res.status(404).send({ error: "No stations found." });
      }
      // If stations are found, send them in the response
      else {
        res.status(200).send({ response: stations });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching stations." });
  }
});
