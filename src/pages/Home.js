import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
    const [passwords, setPasswords] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => { loadUsers() }, [])

    const DEFAULT_ERROR_MESSAGE = "There was a problem with the request.Contact an administrator."

    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

    const loadUsers = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/v1/users/${userId}/passwords`, 
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            setPasswords(result.data)
        } catch (err) {
            if (err.response) {
                const { message, status, timestamp } = err.response.data
                setError({ message, status, timestamp })
            } else {
                setError({ message: DEFAULT_ERROR_MESSAGE, status: 500, timestamp: new Date().toISOString() })
            }
        }   
    }

    const deletePassword = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/v1/passwords/${id}`, 
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            loadUsers()
        } catch (err) { 
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
            <div className='table-container'>
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            passwords.map((password, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{password.name}</td>
                                    <td>{password.password}</td>
                                    <td>
                                        <Link
                                            className='btn btn-update mx-2'
                                            to={`/updatepassword/${password.id}`}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className='btn btn-delete mx-2'
                                            onClick={() => deletePassword(password.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {error && (
                    <div className="alert alert-danger mt-4">
                        <p><strong>Error:</strong> {error.message}</p>
                        <p><strong>Status:</strong> {error.status}</p>
                        <p><strong>Timestamp:</strong> {new Date(error.timestamp).toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    )
}