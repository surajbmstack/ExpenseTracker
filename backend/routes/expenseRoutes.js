const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");
const router = express.Router();

// Get expenses
router.get("/", auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add expense
router.post("/add", auth, async (req, res) => {
    const { description, amount } = req.body;
    const expense = new Expense({ user: req.user.id, description, amount });

    await expense.save();
    res.status(201).json(expense);
});

module.exports = router;
