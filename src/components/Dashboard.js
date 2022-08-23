import React from 'react';
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, provider } from "../firebase";


export const Dashboard = () => {

    return (
        <div>
            Dashboard
        </div>
    )
}