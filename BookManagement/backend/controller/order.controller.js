import Order from "../models/order.models.js";
import Book from "../models/book.models.js";

// create an order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, customer, comboId } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order must contain items" });
    }
    if (totalAmount == null) {
      return res.status(400).json({ message: "totalAmount is required" });
    }

    // create order
    const order = new Order({ items, totalAmount, customer, comboId });
    const saved = await order.save();

    // decrement stock for each item (best-effort)
    for (const it of items) {
      try {
        if (it.bookId) {
          await Book.findByIdAndUpdate(it.bookId, {
            $inc: { stock: -Math.max(1, it.quantity || 1) },
          });
        }
      } catch (e) {
        // ignore decrement errors
        console.error("Stock decrement failed:", e.message);
      }
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
