import React from "react";
import "./App.css";

import Error from "./components/Error";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
