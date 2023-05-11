import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Logout() {

    useEffect(() => {
      // some check somehow
      window.location.replace("http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/logout");

    }, []);

    return (

        <div className="d-flex justify-content-center">
            <h1>Logout</h1>
        </div>
    );
}
