import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:9000/',
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

apiClient.interceptors.response.use(response => {
    return response
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post('http://localhost:9000/auth/refresh', { refreshToken })
            const { newAccessToken } = response.data
            localStorage.setItem('accessToken', newAccessToken)
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
            return apiClient(originalRequest)
        } catch (refreshError) {
            console.error('Token refresh error:', refreshError)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            throw refreshError
        }
    }
    return Promise.reject(error)
})

export default apiClient