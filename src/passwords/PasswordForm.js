import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../styles/Form.css'
import { UseError } from '../hooks/UseError'

const PasswordForm = ({ isUpdate = false }) => {
    const [password, setPassword] = useState({ name: "" })
    const [charge, setCharge] = useState(true)
    const { error, handleError } = UseError()
    const navigate = useNavigate()
    const { id } = useParams()
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    const { name } = password

    useEffect(() => {
        if (isUpdate && charge) {
            const loadPassword = async () => {
                try {
                    const result = await axios.get(`http://localhost:8080/api/v1/passwords/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                    setPassword(result.data)
                    setCharge(false)
                } catch (err) {
                    handleError(err)
                }
            }
            loadPassword()
        }
    }, [isUpdate, id, accessToken, handleError])

    const onInputChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const url = isUpdate
            ? `http://localhost:8080/api/v1/passwords/${id}`
            : `http://localhost:8080/api/v1/passwords`

        const method = isUpdate ? 'patch' : 'post'

        try {
            await axios[method](url, { name, userId }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
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

export default PasswordForm