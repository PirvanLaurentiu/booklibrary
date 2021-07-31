import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import "../App.css";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'auto',
        alignItems: 'center',
        marginLeft: '80px',
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


function Login(props) {
    console.log(props);
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var [error, setError] = useState(null);
    var [errorOpen, setErrorOpen] = useState(false);

    Axios.defaults.withCredentials = true;

    const errorClose = e => {
        setErrorOpen(false)
    }

    const history = useHistory()

    const login = (e) => {
        e.preventDefault();
        Axios.post("/api/login", {
            email: username,
            password: password,
        }).then((response) => {
            if (!response.data.auth) {
                console.log(response)
                setError(response.data.error)
                setErrorOpen(true)
            } else {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                console.log(props);
                // set user logged in in Header (parent component)
                props.location.fnSetIsLoggedIn(true);
                props.location.fnSetUsername(username);
                //props.isLoggedIn = true;
                window.location.href = '/';
              }
        }).catch((error) => {
            console.log(error)
            setError(error.message)
            setErrorOpen(true)
        });
    };

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
            </div>
            {error ? (
            <Snackbar
              variant="error"
              key={error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={errorOpen}
              onClose={errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                ]}
              />
            </Snackbar>
          ) : null}
        </div>
    );
}

export default withRouter(Login);
