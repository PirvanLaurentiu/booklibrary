import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import "../App.css";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'auto',
      alignItems: 'center',
      padding: theme.spacing(8),
  
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));

function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post("/api/login", {
            email: username,
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
            <div className={classes.root}>
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
