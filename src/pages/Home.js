import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
    const [passwords, setPasswords] = useState([])
    useEffect(() => { loadUsers() }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/passwords")
        setPasswords(result.data)
    }

    const deletePassword = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/passwords/${id}`)
        loadUsers()
    }

    return (
        <div className='container'>
            <div className='py-4'>
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
                                            className='btn btn-primary mx-2 custom-btn'
                                            to={`/updatepassword/${password.id}`}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className='btn btn-danger mx-2 custom-btn'
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
            </div>
        </div>
    )
}