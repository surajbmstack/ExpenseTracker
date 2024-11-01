import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirection
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/api/expenses", { headers: { Authorization: token } })
                .then(res => setExpenses(res.data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const fetchExpenses = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/expenses", { headers: { Authorization: token } });
        setExpenses(res.data);
    };

    return (
        <Router>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                {/* Check if user is authenticated, if not redirect to login */}
                <Route path="/" element={user ? (
                    <>  <div className="container">

              <ExpenseForm fetchExpenses={fetchExpenses} />
              <ExpenseList expenses={expenses} />
                    </div>
                      
                    </>
                ) : (
                    <Navigate to="/signup" /> // Redirect to signup if user is not authenticated
                )} />
            </Routes>
        </Router>
    );
};

export default App;
