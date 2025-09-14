import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    items: [
      {
        bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        title: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    comboId: { type: Schema.Types.ObjectId, ref: "Combo" },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
