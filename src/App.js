import React, {useState} from "react";
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Camera from './components/camera.js';
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signuserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();

      setIsAuth(false);
    });
  };
  return (
    <Router className="App">
        <div className="h-screen w-screen bg-slate-600">
          <nav className="App-header">
          <Camera/>
            {!isAuth ? (
              <Link className="item" to={"/login"}>Login</Link>):(
              <>
                <Link to={"/"} className="item">
                  Dashboard
                  
                </Link>
                <Link to={"/login"} className="item" onClick={signuserOut}>
                  Log Out
                </Link>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/" element={<Dashboard isAuth={isAuth} />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
