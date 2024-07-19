import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Form.css'

export default function AddPassword() {

  let navigate = useNavigate()

  const [password, setPassword] = useState({name: ""})
  const {name} = password

  const onInputChange = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    await axios.post("http://localhost:8080/api/v1/passwords", password)
    navigate("/")
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Generate Password</h2>

          <form onSubmit={ (event) => onSubmit(event) }>
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
            <button type='sumbit' className='btn btn-outline-primary mx-1' style={{ width: '150px' }}>Generate</button>
            <Link type='sumbit' className='btn btn-outline-danger mx-1' style={{ width: '150px' }} to="/">Cancel</Link>
          </form>

        </div>
      </div>
    </div>
  )
}