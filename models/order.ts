import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        id: {
          type: Number,
          required: true,
        },
        product: {
          type: Object,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
