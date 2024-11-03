import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  
const handleLogout=()=>{
    setToken(null);
    localStorage.clear(token)
}
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            {!token ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/expenses">Expenses</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
