const mongoose = require("mongoose");

const StationDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  time_table: {
    type: Object,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
  store_contact: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
});
const StationDataModel = mongoose.model("StationData", StationDataSchema);
module.exports = StationDataModel;
