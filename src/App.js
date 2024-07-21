import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoggedNavbar from './layout/LoggedNavbar'
import DefaultNavbar from './layout/DefaultNavbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AddPassword from './passwords/AddPassword'
import UpdatePassword from './passwords/UpdatePassword'
import LoginPage from './auth/LoginPage'
import SigninPage from './auth/SigninPage'
import ProtectedRoute from './components/ProtectedRoute'

function MainLayout() {
  const location = useLocation()
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/signin"

  return (
    <>
      {showNavbar ? <LoggedNavbar /> : <DefaultNavbar />}
      <div className="container">
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signin" element={<SigninPage />} />
          <Route exact path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route exact path="/addpassword" element={<ProtectedRoute element={<AddPassword />} />} />
          <Route exact path="/updatepassword/:id" element={<ProtectedRoute element={<UpdatePassword />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout />
      </Router>
    </div>
  )
}

export default App