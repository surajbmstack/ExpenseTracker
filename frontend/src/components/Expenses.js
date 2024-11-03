import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';

const Expenses = () => {
    const [expensesByDate, setExpensesByDate] = useState({});

    // Define an inner function to fetch expenses
    const fetchExpenses = async () => { // Early return if token is not available

        try {
            const { data } = await axios.get("http://localhost:5000/api/expenses", {
                headers: { Authorization: localStorage.getItem("token") },
            });

            // Group expenses by date in "MMM DD, YYYY" format
            const groupedByDate = data.reduce((acc, expense) => {
                const date = new Date(expense.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                });
                if (!acc[date]) acc[date] = [];
                acc[date].push(expense);
                return acc;
            }, {});

            setExpensesByDate(groupedByDate);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    // Use useEffect to call fetchExpenses when the token changes
    useEffect(() => {
        fetchExpenses();
    }, []); // Include token in dependency array

    return (
        <div className="expenses">
            <h2>Your Expenses</h2>
            <ExpenseForm fetchExpenses={fetchExpenses} />
            <div>
                {Object.entries(expensesByDate).map(([date, expenses]) => (
                    <div key={date} className="expense-block">
                        <h3>{date}</h3>
                        {expenses.map(expense => (
                            <div key={expense._id}>
                                <p>{expense.description}: Rs {expense.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expenses;
