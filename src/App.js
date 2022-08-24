import React, {useState} from "react";
import Login from './components/Login';
import {Dashboard} from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Camera from './components/camera.js';
import { AuthContextProvider } from "./context/AuthContext";

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
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/camera" element={<Camera/>}/>
          </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
