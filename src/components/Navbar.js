import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


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
            <h1>Placeholder</h1>
            {user?.displayName ? <button onClick={handleSignOut}>Logout</button> : <button onClick={handleLogin}>Login</button> }
        </div>
    </nav>
  )
}