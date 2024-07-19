import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Form.css'

export default function UpdatePassword() {

    let navigate = useNavigate()

    const {id} = useParams()

    const [password, setPassword] = useState({ name: "" })
    const { name } = password

    const onInputChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    useEffect(() => { loadPassword() }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/passwords/${id}`, password)
        navigate("/")
    }

    const loadPassword = async () => {
        console.log(id)
        const result = await axios.get(`http://localhost:8080/api/v1/passwords/${id}`)
        setPassword(result.data)
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
                                type={'text'}
                                className='form-control'
                                placeholder='Enter the password name'
                                name="name"
                                value={name}
                                onChange={(event) => onInputChange(event)}
                            />
                        </div>
                        <button type='sumbit' className='btn btn-outline-primary mx-1' style={{ width: '150px' }}>Update</button>
                        <Link type='sumbit' className='btn btn-outline-danger mx-1' style={{ width: '150px' }} to="/">Cancel</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}