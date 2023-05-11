import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import axios from "axios";

export default function Login() {

  useEffect(() => {
    window.location.replace("http://localhost:5003/login");
  }, []);



  return (
    <div className="d-flex justify-content-center">
      <p>Login</p>
    </div>
  );
}
