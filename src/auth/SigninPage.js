import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/LoginPage.css'

export default function SigninPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const DEFAULT_ERROR_MESSAGE = "There was a problem with the request. Contact an administrator."

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post("http://localhost:8080/auth/register", { username, password })
            const authResponse = await axios.post("http://localhost:8080/auth/login", { username, password })
            if (authResponse.data.accessToken && authResponse.data.userId) {
                localStorage.setItem('accessToken', authResponse.data.accessToken)
                localStorage.setItem('userId', authResponse.data.userId)
                navigate("/home")
            }
        } catch (err) {
            console.log(err)
            if (err.response) {
                const { message, status, timestamp } = err.response.data
                setError({ message, status, timestamp })
            } else {
                setError({ message: DEFAULT_ERROR_MESSAGE, status: 500, timestamp: new Date().toISOString() })
            }
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Create an Account</h2>

                    <form onSubmit={(event) => onSubmit(event)}>
                        <div className='mb-3'>
                            <div className='d-flex align-items-center mb-2'>
                                <label htmlFor='username' className='form-label mb-0 me-2' style={{ minWidth: '120px' }}>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
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
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-primary mx-1' style={{ width: '150px' }}>Register</button>
                    </form>
                    <Link to="/login">Already have an account? Log In.</Link>

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