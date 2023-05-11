import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import axios from "axios";

export default function Login() {

  useEffect(() => {
    window.location.replace("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/login");
  }, []);



  return (
    <div className="d-flex justify-content-center">
      <p>Login</p>
    </div>
  );
}
