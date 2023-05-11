import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCard from "../components/SignUpCard";
import axios from "axios";

export default function Signup() {

  useEffect(() => {
    window.location.replace("http://localhost:5003/login");
  }, []);


  return (
    <div className="d-flex justify-content-center">
      <p>Sign Up</p>
    </div>
  );
}
