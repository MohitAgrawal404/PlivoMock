import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'
import Contact from './Contact';
import { Container } from 'react-bootstrap';


export const Dashboard = () => {
    const navigate = useNavigate()
    const {user, logOut} = UserAuth()
    const [isEmail, setIsEmail] = useState(false)


    useEffect(() => {
        console.log(isEmail)
    }, [isEmail])

    const handleEmail = () => {
        setIsEmail(!isEmail)
    }


    return (
        <div>
            Dashboard
            {isEmail?  <button onClick={handleEmail}>Cancel</button> : <button onClick={handleEmail}>Send Email to Admin</button>}
            {isEmail? <Container class="w-50"><Contact/></Container> : ""}
        </div>
    )
}