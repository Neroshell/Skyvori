const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorite_game: { type: Schema.Types.ObjectId, ref: 'Game', required: false },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
