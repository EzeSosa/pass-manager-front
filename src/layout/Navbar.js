import React from 'react'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="#">
                    Password Manager
                </Link>
                <div className="ms-auto">
                    <Link className="btn btn-outline-light custom-btn" to="/addpassword">Generate New Password</Link>
                </div>
            </div>
        </nav>
    )
}