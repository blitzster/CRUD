
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Homepage"
import Createpage from "../pages/Createpage"
import Navbar from "../components/Navbar"


function App() {
  return (
<>  
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/create" element={<Createpage />} />
    </Routes>

    

    </>
    
  );
}

export default App
