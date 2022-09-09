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

    return (
        <div>
            {!user ? 
            (<Customer/>) 
            : 
            (<div><FullView />

            </div>)
            }
        </div>
    )
}