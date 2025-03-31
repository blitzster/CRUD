import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const handleAddClick = () => {
        navigate("/create");
    }

    const handleLogoCLick = () => {
        navigate("/")
    }



  return (
    <div className={darkMode ? 'dark-mode':''}>
      <nav className="navbar">
        <div className="logo" onClick={handleLogoCLick} style={{cursor: 'pointer'}}>My Logo</div>
        <div className="icons">
          <button className="icon-button" onClick={handleAddClick}>
          ➕
          </button>
          <button className="icon-button" onClick={toggleDarkMode}>
          {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      
    </div>
  )
}

export default Navbar