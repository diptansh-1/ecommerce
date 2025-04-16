import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true, ref: 'User' },
  items: [{
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    required: true, 
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
