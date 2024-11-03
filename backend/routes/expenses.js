const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// Add a new expense
router.post('/add', auth, async (req, res) => {
    const { description, amount } = req.body;
    const expense = new Expense({ description, amount, userId: req.user.id });
    
    try {
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense' });
    }
});

// Get expenses for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

module.exports = router;
