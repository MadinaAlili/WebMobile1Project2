import React from 'react'
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <div>

            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>

            </nav>


        </div>
    )
}

export default Navbar