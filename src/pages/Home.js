import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { UseError } from '../hooks/UseError'

export default function Home() {
    const [passwords, setPasswords] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    const { error, handleError } = UseError()

    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')

    const BASE_URL = "http://localhost:9000/api/v1/users"
    const size = 6

    useEffect(() => {
        const loadPasswords = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/${userId}/passwords`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    params: { size: size, pageNumber: pageNumber }
                })
                setPasswords(result.data.content)
                setTotalPages(result.data.totalPages)
            } catch (err) {
                handleError(err)
            }
        }
        loadPasswords()
    }, [userId, accessToken, handleError, pageNumber])

    const deletePassword = async (passwordId) => {
        try {
            await axios.delete(`http://localhost:9000/api/v1/passwords/${passwordId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            setPasswords(passwords.filter(password => password.passwordId !== passwordId))
        } catch (err) {
            handleError(err)
        }
    }

    const handleNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    return (
        <div className='container'>
            <div className='table-container'>
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwords.map((password, index) => (
                            <tr key={index}>
                                <td>{password.name}</td>
                                <td>{password.password}</td>
                                <td>
                                    <Link className='btn btn-update mx-2' to={`/updatepassword/${password.passwordId}`}>
                                        Update
                                    </Link>
                                    <button className='btn btn-delete mx-2' onClick={() => deletePassword(password.passwordId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-buttons">
                    <button className='btn mx-1 btn-page' onClick={handlePreviousPage} disabled={pageNumber === 0}>{'<<'}</button>
                    <button className='btn mx-1 btn-page' onClick={handleNextPage} disabled={pageNumber >= totalPages - 1}>{'>>'}</button>
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
    )
}