import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Logout() {

    useEffect(() => {
      // some check somehow
      window.location.replace("http://localhost:5003/logout");

    }, []);

    return (

        <div className="d-flex justify-content-center">
            <h1>Logout</h1>
        </div>
    );
}
