import React, { useState } from "react";
import axios from "axios";

const ExpenseForm = ({ fetchExpenses}) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/expenses/add", { description, amount }, {
            headers: { Authorization: localStorage.getItem("token")},
        });
        fetchExpenses();
        setDescription("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
