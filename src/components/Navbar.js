import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar() {

  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <h1 className='title'>Contacto</h1>
            {user?.displayName ? <button onClick={handleSignOut} className='title'>Logout</button> : <button onClick={handleLogin} className='title'>Login</button> }
        </div>
    </nav>
  )
}