import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import  { UserAuth }  from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const {googleSignIn, user} = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
        await googleSignIn()
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if(user != null) {
        navigate("/")
    }
  }, [user])

  return (
    <div>
        <h3 class="text-center">Sign In</h3>
        <div class="d-flex justify-content-center">
            <GoogleButton onClick={handleGoogleSignIn}/>
        </div>
    </div>
  )
}
