import React from "react";
import "./App.css";

import Error from "./components/Error";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user" element={<UserPage} />
        <Route element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
