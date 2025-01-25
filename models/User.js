import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
  avatar: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
