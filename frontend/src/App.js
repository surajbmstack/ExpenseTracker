import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expenses from "./components/Expenses";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/expenses" element={ token?(<Expenses  />):(<Login setToken={setToken} />)} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
