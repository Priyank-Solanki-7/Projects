import mongoose from "mongoose";

const comboSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    books: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Combo", comboSchema);
