import React, { useEffect} from "react";
import { useHistory } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import axios from "axios";

export default function Login() {

  const history = useHistory();

  useEffect(() => {
    // some check somehow
    axios.get("http://localhost:5003/login")
      .then((res) => {
        console.log(res);
        history.push("/");
      }
      ).catch((err) => {
        console.log(err);
      }
      )
  }, [history]);



  return (
    <div className="d-flex justify-content-center">
      <p>Login</p>
    </div>
  );
}
