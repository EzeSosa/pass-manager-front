import React from 'react'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'

export default function LoggedNavbar() {
    const onSubmit = async (event) => {
        event.preventDefault()
        localStorage.removeItem('userId')
        localStorage.removeItem('accessToken')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="#">
                    Password Manager
                </Link>
                <div className="ms-auto">
                    <Link className="btn custom-btn" to="/addpassword">Generate New Password</Link>
                    <Link className="btn custom-btn" to="/login" onSubmit={onSubmit}>Logout</Link>
                </div>
            </div>
        </nav>
    )
}