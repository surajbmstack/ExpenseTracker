import React from "react";

const ExpenseList = ({ expenses }) => {
 
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount}
                    </li>
                ))}
            </ul>
            <p><strong>Total Expenses: </strong>${total.toFixed(2)}</p>
        </div>
    );
};

export default ExpenseList;
