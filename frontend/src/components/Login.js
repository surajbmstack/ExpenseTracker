import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });
            
            if(response.data.success){
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            navigate("/expenses")
            alert("you are logged in..welcome!")
            
            }
            
            
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
