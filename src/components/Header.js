import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Routes from "./Routes";
import Axios from "axios";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        flex: 1,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}));

function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState("");
    console.log(props);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        Axios.get("/api/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            console.log(response)
            setIsLoggedIn(response.data.loggedIn)
            setUsername(response.data.user)
        })
    })

    const handleLogout = () => {
        console.log("clearing localstorage")
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} noWrap>
                        Biblioteca virtuala
                    </Typography>
                    {isLoggedIn ? <div><h3 style={{display:"inline-block"}}>Bine ai venit, {username}, </h3> <Button onClick={handleLogout} renderAs="button"> <span> Logout </span></Button> </div> : <div>
                    <Link to="/register">
                        <Button renderAs="button">
                            <span>Register</span>
                        </Button>
                    </Link>
                    <Link to={{
                        pathname: "/login",
                        userLoggedIn: isLoggedIn,
                        fnSetIsLoggedIn: setIsLoggedIn,
                        fnSetUsername: setUsername,
                    }}>
                        <Button renderAs="button">
                            <span>Login</span>
                        </Button>
                    </Link> </div>}
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default withStyles(useStyles)(Header);
