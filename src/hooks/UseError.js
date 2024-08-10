import { useState } from 'react'

export const UseError = () => {
    const [error, setError] = useState(null)

    const handleError = (err) => {
        if (err.response) {
            const { message, status, timestamp } = err.response.data
            setError({ message, status, timestamp })
        } else {
            setError({
                message: 'There was a problem with the request. Contact an administrator.',
                status: 500,
                timestamp: new Date().toISOString()
            })
        }
    }

    return { error, setError, handleError }
}