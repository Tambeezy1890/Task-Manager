import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import { useState } from "react";
import "./scss/App.css";
function App() {
  const [authModal, setAuthModal] = useState(null);
  // null | "login" | "signup"

  return (
    <>
      <NavBar
        onLoginClick={() => setAuthModal("login")}
        onSignupClick={() => setAuthModal("signup")}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {authModal && (
        <div className="modal-backdrop" onClick={() => setAuthModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setAuthModal(null)}>X</button>

            {authModal === "login" && <Login />}
            {authModal === "signup" && <Signup />}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
