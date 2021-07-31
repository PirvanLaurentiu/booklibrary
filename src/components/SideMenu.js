import React from "react";
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

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{Routes.map((prop, key) => {
					return (
						<div>
							{ (prop.needsLogin && localStorage.getItem("username")) != null || !prop.needsLogin ? 
													<ListItem key={prop.sidebarName} component={Link} to={prop.path}>
													<ListItemIcon>
														<prop.icon />
													</ListItemIcon>
													<ListItemText primary={prop.sidebarName} />
												</ListItem>
							: null }
						</div>
					);
				})}
			</List>
			<Divider />
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<div className={classes.content}> 
				<nav className={classes.drawer} aria-label="mailbox folders">
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor="left"
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
			</div>
		</div>
	);
}

export default withStyles(useStyles)(ResponsiveDrawer);
