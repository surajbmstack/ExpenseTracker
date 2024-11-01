import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <nav>
           
            {user ? (
                <>   <Link to="/">Home</Link>
                    <span>Welcome, {user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                   
                </>
            ) : (
                <><Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </>
                
            )}
        </nav>
    );
};

export default Navbar;
