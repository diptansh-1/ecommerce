import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
