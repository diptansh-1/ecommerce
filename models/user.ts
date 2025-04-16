import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  phone?: string;
  wishlist: number[];
  orders: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  phone: { type: String },
  wishlist: [{ type: Number }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
