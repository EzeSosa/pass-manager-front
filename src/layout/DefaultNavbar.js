import React from 'react'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'

export default function DefaultNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="#">
                    Password Manager
                </Link>
            </div>
        </nav>
    )
}