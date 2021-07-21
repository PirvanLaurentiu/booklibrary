import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import "../App.css";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { FormatColorResetRounded } from "@material-ui/icons";


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

function Register() {
    const classes = useStyles();

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    var [error, setError] = useState(null);
    var [errorOpen, setErrorOpen] = useState(false);

    Axios.defaults.withCredentials = true;

    const errorClose = e => {
        setErrorOpen(false)
    }

    const register = () => {
        Axios.post("/api/register", {
            email: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
            if (!response.data.success) {
                setError(response.data.error)
                setErrorOpen(true)
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

export default withRouter(Register);
