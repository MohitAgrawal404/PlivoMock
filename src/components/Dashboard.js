import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext'
import Contact from './Contact';
import { Container } from 'react-bootstrap';
import {FullView} from './FullView'
import { Customer } from './Customer';
import PhotoSend from './fileSending';
import {Email} from './Email';
import './Dashboard.css';
export const Dashboard = () => {
    const navigate = useNavigate()
    const {user, logOut} = UserAuth()
    const [selected, setSelected] = useState("message")



    return (
        <div>
            {!user ? 
            (<Customer/>) 
            : 
            (
            <div> 
                <div className = 'cent'>
                    <button onClick = {() => setSelected("message")} className = 'button'>
                        In-App Messages
                    </button>
                    <button onClick = {() => setSelected("email")} className = 'button'>
                        Emails
                    </button>
                </div>
                <div>
                    {selected === "message" ?
                    (<FullView/>)
                    :
                    (<Email/>) 
                    }
                </div>
            </div>
            ) 
            }
        </div>
    )
}