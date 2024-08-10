import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../utils/apiClient'
import '../styles/LoginPage.css'

const DEFAULT_ERROR_MESSAGE = "There was a problem with the request. Contact an administrator."

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await apiClient.post("auth/login", { username, password })
            const { accessToken, refreshToken, user } = response.data
            const { userId } = user
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('userId', userId)

            navigate("/home")
        } catch (err) {
            const message = err.response?.data?.message || DEFAULT_ERROR_MESSAGE
            const status = err.response?.status || 500
            const timestamp = new Date().toISOString()
            setError({ message, status, timestamp })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        handleLogin()
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Log In to Password Manager</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <div className='d-flex align-items-center mb-2'>
                                <label htmlFor='username' className='form-label mb-0 me-2' style={{ minWidth: '120px' }}>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className='d-flex align-items-center mb-2'>
                                <label htmlFor='password' className='form-label mb-0 me-2' style={{ minWidth: '120px' }}>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-primary mx-1' style={{ width: '150px' }}>Log In</button>
                    </form>
                    <div className='row p-3'>
                        <Link to="/signup">Don't have an account? Sign Up.</Link>
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-4">
                            <p><strong>Error:</strong> {error.message}</p>
                            <p><strong>Status:</strong> {error.status}</p>
                            <p><strong>Timestamp:</strong> {new Date(error.timestamp).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}