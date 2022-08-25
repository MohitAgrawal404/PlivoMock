import React, {useState, useEffect} from "react";
import Login from './components/Login';
import {Dashboard} from './components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './components/features/userSlice';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import Camera from './components/camera.js';
import { AuthContextProvider } from "./context/AuthContext";
import Contact from "./components/Contact";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect (() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser){
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else{
        dispatch(logout())
      }
    })
  }, [])

  
  return (
    <AuthContextProvider>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/camera" element={<Camera/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
