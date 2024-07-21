import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import '../styles/Navbar.css'

export default function LoggedNavbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    Password Manager
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="btn btn-outline-light nav-link border" to="/addpassword">Generate Password</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light nav-link border" onClick={handleLogout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}