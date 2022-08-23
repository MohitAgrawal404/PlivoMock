import React from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, provider } from "../firebase";


export const Login = () => {
    let navigate = useNavigate();
    const log = (() => {
        navigate("/");
    });

    return (
        <div>
            <button onClick = {log}>
                login
            </button>
        </div>
    )
}