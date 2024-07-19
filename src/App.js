import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPassword from './passwords/AddPassword';
import UpdatePassword from './passwords/UpdatePassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/addpassword" element={<AddPassword/>}/>
          <Route exact path="/updatepassword/:id" element={<UpdatePassword/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
