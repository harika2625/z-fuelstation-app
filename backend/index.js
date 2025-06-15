const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
const UserModel = require("./models/user");
const PaymentDetailsModel = require("./models/paymentDetails");
const StationModel = require("./models/station");
const StationDataModel = require("./models/stationData");
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
app.post("/PaymentDetails", (req, res) => {
  PaymentDetailsModel.create(req.body)
    .then((paymentDetails) => res.json(paymentDetails))
    .catch((err) => res.json(err));
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare entered password with hashed password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          res.status(200).json("successfully logged in");
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server error", error: err })
    );
});

app.get("/home", (req, res) => {
  res.status(200).json({ message: "Welcome to the Home Page!" });
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
<<<<<<< HEAD
=======

app.get("/stationdata/:name", async (req, res) => {
  try {
    if (
      req.params.name === undefined ||
      req.params.name === null ||
      req.params.name === ""
    ) {
      return res.status(400).json({ message: "Station name is required" });
    }
    const stationName = req.params.name;
    const stationData = await StationDataModel.findOne({ name: stationName });
    if (!stationData) {
      return res.status(404).json({ message: "Station data not found" });
    }
    res.status(200).json(stationData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/nearestcarwash", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    let nearest;
    let totalDistance = 100000000000;

    const stations = await StationDataModel.find();
    stations.forEach((station) => {
      if (station.services.includes("Z20 Carwash") === false) {
        return;
      }
      const distance = () => {
        latDistance = Math.abs(lat - station.location.lat);
        lngDistance = Math.abs(lng - station.location.lng);
        return latDistance + lngDistance;
      };

      const thisDistance = distance();
      if (thisDistance < totalDistance) {
        totalDistance = thisDistance;
        nearest = station;
      }
    });

    console.log(nearest);
    res
      .status(200)
      .json({ lat: nearest.location.lat, lng: nearest.location.lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/nearestcarwash", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    let nearest;
    let totalDistance = 100000000000;

    const stations = await StationDataModel.find();
    stations.forEach((station) => {
      if (station.services.includes("Z20 Carwash") === false) {
        return;
      }
      const distance = () => {
        latDistance = Math.abs(lat - station.location.lat);
        lngDistance = Math.abs(lng - station.location.lng);
        return latDistance + lngDistance;
      };

      const thisDistance = distance();
      if (thisDistance < totalDistance) {
        totalDistance = thisDistance;
        nearest = station;
      }
    });

    console.log(nearest);
    res
      .status(200)
      .json({ lat: nearest.location.lat, lng: nearest.location.lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/nearestev", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    let nearest;
    let totalDistance = 100000000000;

    const stations = await StationDataModel.find();
    stations.forEach((station) => {
      if (station.services.includes("EV Charging") === false) {
        return;
      }
      const distance = () => {
        latDistance = Math.abs(lat - station.location.lat);
        lngDistance = Math.abs(lng - station.location.lng);
        return latDistance + lngDistance;
      };

      const thisDistance = distance();
      if (thisDistance < totalDistance) {
        totalDistance = thisDistance;
        nearest = station;
      }
    });

    console.log(nearest);
    res
      .status(200)
      .json({ lat: nearest.location.lat, lng: nearest.location.lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/nearestbathroom", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    let nearest;
    let totalDistance = 100000000000;

    const stations = await StationDataModel.find();
    stations.forEach((station) => {
      if (station.services.includes("Bathroom") === false) {
        return;
      }
      const distance = () => {
        latDistance = Math.abs(lat - station.location.lat);
        lngDistance = Math.abs(lng - station.location.lng);
        return latDistance + lngDistance;
      };

      const thisDistance = distance();
      if (thisDistance < totalDistance) {
        totalDistance = thisDistance;
        nearest = station;
      }
    });

    console.log(nearest);
    res
      .status(200)
      .json({ lat: nearest.location.lat, lng: nearest.location.lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/nearestcoffee", async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    let nearest;
    let totalDistance = 100000000000;

    const stations = await StationDataModel.find();
    stations.forEach((station) => {
      if (station.services.includes("Z Express") === false) {
        return;
      }
      const distance = () => {
        latDistance = Math.abs(lat - station.location.lat);
        lngDistance = Math.abs(lng - station.location.lng);
        return latDistance + lngDistance;
      };

      const thisDistance = distance();
      if (thisDistance < totalDistance) {
        totalDistance = thisDistance;
        nearest = station;
      }
    });

    console.log(nearest);
    res
      .status(200)
      .json({ lat: nearest.location.lat, lng: nearest.location.lng });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

>>>>>>> main
