const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define Payment Schema and Model
const PaymentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Use ObjectId to reference Course model
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Payment = mongoose.model("Payment", PaymentSchema);

// POST route to store payment details
router.post("/storePayment", async (req, res) => {
  const { courseId, amount } = req.body;

  // Assuming you send the actual ObjectId value for courseId
  try {
    const payment = new Payment({
      courseId: new mongoose.Types.ObjectId(courseId), // Use 'new' to instantiate ObjectId
      amount,
      date: new Date(),
    });

    await payment.save();
    res.status(200).json({ message: "Payment recorded successfully" });
  } catch (err) {
    console.error("Error storing payment:", err);
    res
      .status(500)
      .json({ message: "Error storing payment", error: err.message });
  }
});

module.exports = router;
