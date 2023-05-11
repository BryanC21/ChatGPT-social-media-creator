import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpCard from "../components/SignUpCard";
import axios from "axios";

export default function Signup() {

  const history = useNavigate();


  useEffect(() => {
    // some check somehow
    axios.get("http://localhost:5003/login")
      .then((res) => {
        console.log(res);
        history("/");
      }
      ).catch((err) => {
        console.log(err);
      }
      )
  }, [history]);


  return (
    <div className="d-flex justify-content-center">
      <p>Sign Up</p>
    </div>
  );
}
