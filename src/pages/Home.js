import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { UseError } from '../hooks/UseError'

export default function Home() {
    const [passwords, setPasswords] = useState([])
    const { error, handleError } = UseError()
    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

    const BASE_URL = "http://localhost:8080/api/v1/users"

    useEffect(() => {
        const loadPasswords = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/${userId}/passwords`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                setPasswords(result.data)
            } catch (err) {
                handleError(err)
            }
        }

        loadPasswords()
    }, [userId, accessToken, handleError])

    const deletePassword = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/passwords/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            setPasswords(passwords.filter(password => password.id !== id))
        } catch (err) {
            handleError(err)
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
                        {passwords.map((password, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{password.name}</td>
                                <td>{password.password}</td>
                                <td>
                                    <Link className='btn btn-update mx-2' to={`/updatepassword/${password.id}`}>
                                        Update
                                    </Link>
                                    <button className='btn btn-delete mx-2' onClick={() => deletePassword(password.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
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
