import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import "../App.css";
import Axios from "axios";

const Login = ({ handleClose }) {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("/api/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };

    const login = () => {
        Axios.post("/api/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
            }
        });
    };

    const userAuthenticated = () => {
        Axios.get("/api/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
        },
    }).then((response) => {
        console.log(response);
    })
    }

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <Button variant="contained" color="primary" onClick={register}> Register </Button>
            </div>

            <div className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button variant="contained" color="primary" onClick={login}> Login </Button>
                <h1>{loginStatus}</h1>
            </div>
            <h1>{loginStatus && <Button variant="contained" color="primary" onClick={userAuthenticated}> Check if authenticated</Button>}</h1>
        </div>
    );
}

export default withRouter(Login);
