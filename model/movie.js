const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
