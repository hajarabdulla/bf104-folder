const Movie = require("../model/movie");

//! Get All Movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getMovies,
};
