const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  password: { type: String, required: true },
  preferences: {
    movieGenres: { type: [String], default: [] },        // e.g. ["action", "sci-fi"]
    foodCategories: { type: [String], default: [] },     // e.g. ["chicken", "italian"]
    foodAreas: { type: [String], default: [] },           // e.g. ["japanese", "indian"]
    likedMovies: [{ id: Number, title: String, genres: [String], poster: String }],
    likedFoods: [{ id: String, name: String, category: String, area: String, image: String }],
    searchHistory: [{
      query: String,
      type: { type: String, enum: ['food', 'movie'] },
      date: { type: Date, default: Date.now }
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
