import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element }) => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? element : <Navigate to="/login" />
}

export default ProtectedRoute