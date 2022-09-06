import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'
import Contact from './Contact';
import { Container } from 'react-bootstrap';
import {FullView} from './FullView'
import { Customer } from './Customer';
import PhotoSend from './fileSending';
export const Dashboard = () => {
    const navigate = useNavigate()
    const {user, logOut} = UserAuth()
    const [isEmail, setIsEmail] = useState(false)


    const handleEmail = () => {
        setIsEmail(!isEmail)
    }


    return (
        <div>
            Dashboard
            {isEmail?  <button onClick={handleEmail}>Cancel</button> : <button onClick={handleEmail}>Send Email to Admin</button>}
            {isEmail? <Container class="w-50"><Contact/></Container> : ""}
            {!user ? 
            (<Customer/>) 
            : 
            (<div><FullView />

            <PhotoSend/></div>)
            }
        </div>
    )
}