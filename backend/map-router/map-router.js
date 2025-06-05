const express = require("express");
const router = express.Router();
const StationModel = require("../models/station");

// GET /map/stations?search_string=...
router.get("/stations", async (req, res) => {
  try {
    const search = req.query?.search_string || "";

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const stations = await StationModel.find(query);

    if (!stations.length) {
      return res.status(404).send({ error: "No stations found." });
    }

    res.status(200).send({ response: stations });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while fetching stations." });
  }
});

module.exports = router;