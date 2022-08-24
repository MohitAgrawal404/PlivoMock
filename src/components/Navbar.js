import React from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAuth } from '../context/AuthContext';


export default function Navbar() {

  const {user, logOut} = UserAuth()

  const handleSignOut = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <h1>Placeholder</h1>
            {user?.displayName ? <button onClick={handleSignOut}>Logout</button> : "" }
        </div>
    </nav>
  )
}