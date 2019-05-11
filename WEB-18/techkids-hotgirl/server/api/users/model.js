const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true },
  password: {type: String},
  fullName: {type: String},
  facebookAccount: {
    uid: {type: String},
    email: {type: String},
  },
}, {
  timestamps: true,
});
const UsersModel = mongoose.model('User', UserSchema);

module.exports = UsersModel;