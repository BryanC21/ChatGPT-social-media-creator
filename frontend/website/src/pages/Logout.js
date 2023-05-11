import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Logout() {

    //TODO code to log out
    //TODO redirect to wherever

    const history = useHistory();

    useEffect(() => {
      // some check somehow
      axios.get("http://localhost:5003/logout")
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
            <h1>Logout</h1>
        </div>
    );
}
