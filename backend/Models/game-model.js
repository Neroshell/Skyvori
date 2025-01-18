const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  available_in_countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
  players_favorite: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
