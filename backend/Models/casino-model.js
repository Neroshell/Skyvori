const mongoose = require('mongoose');
const { Schema } = mongoose;

const casinoSchema = new Schema({
  name: { type: String, required: true, unique: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
});

const Casino = mongoose.model('Casino', casinoSchema);

module.exports = Casino;
