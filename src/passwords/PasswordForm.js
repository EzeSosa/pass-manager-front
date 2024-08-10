import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiClient from '../utils/apiClient'
import '../styles/Form.css'
import { UseError } from '../hooks/UseError'

export default function PasswordForm ({ isUpdate = false }) {
    const [password, setPassword] = useState({ name: "" })
    const [charge, setCharge] = useState(true)

    const { error, handleError } = UseError()
    const { passwordId } = useParams()
    const { name } = password

    const navigate = useNavigate()

    useEffect(() => {
        if (isUpdate && charge) {
            const loadPassword = async () => {
                try {
                    const result = await apiClient.get(`api/v1/passwords/${passwordId}`)
                    setPassword(result.data)
                    setCharge(false)
                } catch (err) {
                    handleError(err)
                }
            }
            loadPassword()
        }
    }, [isUpdate, passwordId, charge, handleError])

    const onInputChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const url = isUpdate
            ? `api/v1/passwords/${passwordId}`
            : 'api/v1/passwords/'

        const method = isUpdate ? 'patch' : 'post'
        const userId = localStorage.getItem("userId")
        const body = isUpdate ? { name } : { name, userId }

        try {
            await apiClient[method](url, body)
            navigate("/home")
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>{isUpdate ? 'Update Password' : 'Generate Password'}</h2>
                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the password name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type='submit' className='btn m-2 btn-outline-primary custom-btn'>{isUpdate ? 'Update' : 'Generate'}</button>
                        <Link className='btn m-2 btn-outline-danger custom-btn' to="/home">Cancel</Link>
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