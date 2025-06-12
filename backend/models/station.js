const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    fuel_price: {
        type: Number,
        required: true,
    },
    fuel_type: {
        type: String,
        required: true,
    },
    // Add latitude and longitude for map markers
    latitude: {
        type: Number,
        required: true,
        default: 0,  // Default value to prevent errors with existing records
    },
    longitude: {
        type: Number,
        required: true,
        default: 0,  // Default value to prevent errors with existing records
    }
})

// Add a geospatial index for more efficient location-based queries
StationSchema.index({ latitude: 1, longitude: 1 });

const StationModel = mongoose.model('Station', StationSchema);
module.exports = StationModel;
