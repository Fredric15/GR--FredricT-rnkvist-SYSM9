const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    team: {
      type: String,
      required: [true, "Please add a team"],
    },
    league: {
      type: String,
      required: [true, "Please add a league"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
