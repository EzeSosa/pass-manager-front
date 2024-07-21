import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Form.css'

export default function UpdatePassword() {

    let navigate = useNavigate()
    const { id } = useParams()

    const [password, setPassword] = useState({ name: "" })
    const [error, setError] = useState(null)
    const { name } = password
    const accessToken = localStorage.getItem('accessToken')

    const DEFAULT_ERROR_MESSAGE = "There was a problem with the request. Contact an administrator."

    const onInputChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    useEffect(() => { loadPassword() }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.patch(
                `http://localhost:8080/api/v1/passwords/${id}`, 
                { name },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            navigate("/home")
        } catch (err) {
            if (err.response) {
                const { message, status, timestamp } = err.response.data
                setError({ message, status, timestamp })
            } else {
                setError({ message: DEFAULT_ERROR_MESSAGE, status: 500, timestamp: new Date().toISOString() })
            }
        }
    }

    const loadPassword = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/v1/passwords/${id}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
        )
            setPassword(result.data)
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
            <div className='row'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Update Password</h2>

                    <form onSubmit={(event) => onSubmit(event)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the password name'
                                name='name'
                                value={name}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary btn-submit'>Update</button>
                        <Link className='btn btn-outline-danger btn-submit' to="/home">Cancel</Link>
                    </form>


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