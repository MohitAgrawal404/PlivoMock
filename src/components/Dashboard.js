import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'


export const Dashboard = () => {
    const navigate = useNavigate()
    const {user, logOut} = UserAuth()

    useEffect(() => {
        if(!user) {
            navigate("/login")
        }
    }, [user])

    return (
        <div>
            <button onClick={logOut}>Logout</button>
            Dashboard
        </div>
    )
}