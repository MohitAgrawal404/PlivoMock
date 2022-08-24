import React, {useState} from "react";
import Login from './components/Login';
import {Dashboard} from './components/Dashboard';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Camera from './components/camera.js';
import { AuthContextProvider } from "./context/AuthContext";
import Contact from "./components/Contact";

function App() {
  // const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // const signuserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear();

  //     setIsAuth(false);
  //   });
  // };
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
