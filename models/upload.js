const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);
