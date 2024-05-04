const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {type: String, require:true},
  name: {type: String, require:true, unuque: true},
  players: {type: [], default: []}
},{
    timestamps:true,
});

module.exports = mongoose.model('Room', roomSchema);