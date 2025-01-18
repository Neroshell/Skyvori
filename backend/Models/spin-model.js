const mongoose = require('mongoose');
const { Schema } = mongoose;

const spinSchema = new Schema({
  player_id: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  game_id: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  spin_result: [{ type: String, required: true }],
  money_won: { type: Number, default: 0 },
  money_lost: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

const Spin = mongoose.model('Spin', spinSchema);

module.exports = Spin;
