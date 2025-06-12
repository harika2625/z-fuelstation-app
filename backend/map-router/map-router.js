/**
 * Map Router Module
 * Handles API routes related to Z Fuel station map functionality
 */
const express = require("express");
const router = express.Router();
const StationModel = require("../models/station");

/**
 * GET /map/stations
 * Returns Z Fuel stations, optionally filtered by search query
 * 
 * Query Parameters:
 * - search_string: Optional text to search for in station names or addresses
 * 
 * Response:
 * - 200: { response: [array of station objects] }
 * - 404: { error: "No stations found." }
 * - 500: { error: "An error occurred while fetching stations." }
 * 
 * Station objects include:
 * - name: Station name
 * - address: Physical address
 * - fuel_price: Current fuel price
 * - fuel_type: Type of fuel
 * - latitude: Geographic coordinate for map placement
 * - longitude: Geographic coordinate for map placement
 */
router.get("/stations", async (req, res) => {
  try {
    // Extract search string from query parameters (if provided)
    const search = req.query?.search_string || "";

    // Build MongoDB query - search by name OR address if search_string is provided
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } }, // Case-insensitive name search
            { address: { $regex: search, $options: "i" } }, // Case-insensitive address search
          ],
        }
      : {}; // Empty query returns all stations

    // Fetch stations from MongoDB based on query
    const stations = await StationModel.find(query);

    // Return 404 if no stations found
    if (!stations.length) {
      return res.status(404).send({ error: "No stations found." });
    }

    // Return stations data
    res.status(200).send({ response: stations });
  } catch (err) {
    // Log and handle any errors
    console.error(err);
    res.status(500).send({ error: "An error occurred while fetching stations." });
  }
});

module.exports = router;