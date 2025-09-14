import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {
      type: String,
      enum: ["GSEB", "CBSE", "Other"],
      default: "GSEB",
    },
    medium: {
      type: String,
      enum: ["Gujarati", "English"],
      default: "Gujarati",
    },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
