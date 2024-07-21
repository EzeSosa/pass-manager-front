import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import LoggedNavbar from './layout/LoggedNavbar'
import DefaultNavbar from './layout/DefaultNavbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AddPassword from './passwords/AddPassword'
import UpdatePassword from './passwords/UpdatePassword'
import LoginPage from './auth/LoginPage'
import SigninPage from './auth/SigninPage'

function MainLayout() {
  const location = useLocation()
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/signin"

  return (
    <>
      {showNavbar && <LoggedNavbar/> || <DefaultNavbar/>}
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signin" element={<SigninPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/addpassword" element={<AddPassword />} />
        <Route exact path="/updatepassword/:id" element={<UpdatePassword />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
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